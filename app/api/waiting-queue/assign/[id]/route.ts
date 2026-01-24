/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { hasTimeOverlap } from "@/lib/utils";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { activityLogModel } from "@/models/activity/activity.model";
import { appointmentModel } from "@/models/appointment/appointment.model";

import { staffModel } from "@/models/staff/staff.model";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";
import { IGenericErrorResponse } from "@/types/common/common";
import { assignFromWaitingQueueSchema } from "@/validators/waiting-queue/waiting-queue.validator";
import { NextResponse } from "next/server";

export const PATCH = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;
      const body = await req.json();
      const data = assignFromWaitingQueueSchema.parse(body);

      await connectDB();

      // 1. Find the Queue item
      const queueItem = await waitingQueueModel.findOne({
        _id: id,
        orgId: req.user.orgId,
      });
      if (!queueItem) throw new Error("Queue item not found");

      // 2. Validate Staff
      const staff = await staffModel.findById(data.staffId);
      if (!staff || staff.availabilityStatus !== "AVAILABLE") {
        throw new Error("Staff is not available or does not exist");
      }

      // 3. Check Capacity & Conflict for the specific time in Queue item
      const startObj = new Date(queueItem.startTime);
      const dayStart = new Date(startObj.setHours(0, 0, 0, 0)).toISOString();
      const dayEnd = new Date(startObj.setHours(23, 59, 59, 999)).toISOString();

      const existingAppointments = await appointmentModel.find({
        staffId: data.staffId,
        startTime: { $gte: dayStart, $lte: dayEnd },
      });

      if (existingAppointments.length >= staff.dailyCapacity) {
        throw new Error(`${staff.name} is already at full capacity today.`);
      }

      const conflict = existingAppointments.some((a) =>
        hasTimeOverlap(
          queueItem.startTime,
          queueItem.endTime,
          a.startTime,
          a.endTime,
        ),
      );

      if (conflict) {
        throw new Error("This staff has a time conflict with this queue slot.");
      }

      // 4. Atomic Swap: Create Appointment and Delete/Update Queue
      const appointment = await appointmentModel.create({
        customerName: queueItem.customerName,
        serviceId: queueItem.serviceId,
        staffId: staff._id,
        startTime: queueItem.startTime,
        endTime: queueItem.endTime,
        orgId: req.user.orgId,
        status: "SCHEDULED",
      });

      await waitingQueueModel.findByIdAndDelete(id);

      await activityLogModel.create({
        orgId: req.user.orgId,
        actionType: "QUEUE_ASSIGNED",
        message: `Queued appointment assigned to staff`,
        appointmentId: appointment._id,
        staffId: appointment.staffId,
      });

      return NextResponse.json({
        success: true,
        data: appointment,
        message: `Successfully assigned to ${staff.name}`,
      });
    } catch (error: any) {
      // Handle Zod errors specifically
      if (error.name === "ZodError") {
        const zodErrorResponse: IGenericErrorResponse = {
          success: false,
          error: {
            message: error.errors
              .map((e: any) => `${e.path.join(".")}: ${e.message}`)
              .join(", "),
          },
        };
        return NextResponse.json(zodErrorResponse, { status: 422 });
      }

      // Generic server error
      const errorResponse: IGenericErrorResponse = {
        success: false,
        error: { message: error.message || "Internal server error" },
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }
  },
);
