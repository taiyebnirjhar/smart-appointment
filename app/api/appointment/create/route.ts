/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { hasTimeOverlap } from "@/lib/utils";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { activityLogModel } from "@/models/activity/activity.model";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { serviceModel } from "@/models/service/service.model";
import { staffModel } from "@/models/staff/staff.model";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { createAppointmentSchema } from "@/validators/appointment/appointment.validator";
import { NextResponse } from "next/server";

export const POST = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const data = createAppointmentSchema.parse(body);

    await connectDB();

    const service = await serviceModel.findById(data.serviceId);
    if (!service) throw new Error("Service not found");

    const startObj = new Date(data.startTime);
    const endTimeStr = new Date(
      startObj.getTime() + service.durationMinutes * 60000,
    ).toISOString();
    const dayStart = new Date(startObj.setHours(0, 0, 0, 0)).toISOString();
    const dayEnd = new Date(startObj.setHours(23, 59, 59, 999)).toISOString();

    // CASE 1: USER SELECTED A SPECIFIC STAFF
    if (data.staffId) {
      const staff = await staffModel.findById(data.staffId);
      if (!staff) throw new Error("Staff member not found");

      // 1. Check Capacity
      const count = await appointmentModel.countDocuments({
        staffId: data.staffId,
        startTime: { $gte: dayStart, $lte: dayEnd },
      });

      if (count >= staff.dailyCapacity) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: `${staff.name} has reached daily capacity. (${count}/${staff.dailyCapacity})`,
            },
          },
          { status: 400 },
        );
      }
      // 2. Check Time Conflict
      const existingAppointments = await appointmentModel.find({
        staffId: data.staffId,
        startTime: { $gte: dayStart, $lte: dayEnd },
      });

      const conflict = existingAppointments.find((a) =>
        hasTimeOverlap(data.startTime, endTimeStr, a.startTime, a.endTime),
      );

      if (conflict) {
        const formatTime = (iso: string) => iso.split("T")[1].substring(0, 5);
        return NextResponse.json(
          {
            success: false,
            error: {
              message: `${staff.name} is already booked from ${formatTime(conflict.startTime)} to ${formatTime(conflict.endTime)}. Please choose another time.`,
            },
          },
          { status: 400 },
        );
      }

      const appointment = await appointmentModel.create({
        customerName: data.customerName,
        serviceId: data.serviceId,
        staffId: data.staffId,
        startTime: data.startTime,
        endTime: endTimeStr,
        status: "SCHEDULED",
        orgId: req.user.orgId,
      });

      await activityLogModel.create({
        orgId: req.user.orgId,
        actionType: "APPOINTMENT_CREATED",
        message: `Appointment created for ${appointment.customerName}`,
        appointmentId: appointment._id,
      });
      await activityLogModel.create({
        orgId: req.user.orgId,
        actionType: "STAFF_ASSIGNED",
        message: `Staff assigned to appointment`,
        appointmentId: appointment._id,
        staffId: appointment.staffId,
      });

      const successResponse: IGenericSuccessResponse<typeof appointment> = {
        success: true,
        data: appointment,
        message: "Appointment created successfully",
      };

      return NextResponse.json(successResponse, { status: 201 });
    }

    // CASE 2: NO STAFF SELECTED -> SEND TO QUEUE
    // Create a record in your separate Queue collection
    const queueEntry = await waitingQueueModel.create({
      customerName: data.customerName,
      serviceId: service._id,
      startTime: data.startTime,
      endTime: endTimeStr,
      orgId: req.user.orgId,
      status: "QUEUED",
    });

    return NextResponse.json(
      {
        success: true,
        data: queueEntry,
        message: "No staff assigned. Appointment added to Waiting Queue.",
      },
      { status: 201 },
    );

    // CASE 2: USER DID NOT SELECT A SPECIFIC STAFF
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
});
