/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { hasTimeOverlap } from "@/lib/utils/utils";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { serviceModel } from "@/models/service/service.model";
import { staffModel } from "@/models/staff/staff.model";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";
import { updateAppointmentSchema } from "@/validators/appointment/appointment.validator";
import { NextResponse } from "next/server";

export const PATCH = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;
      const body = await req.json();
      const data = updateAppointmentSchema.parse(body);

      await connectDB();

      // 1. Find existing appointment
      const existingAppt = await appointmentModel.findOne({
        _id: id,
        orgId: req.user.orgId,
      });

      if (!existingAppt) {
        return NextResponse.json(
          { success: false, error: { message: "Appointment not found" } },
          { status: 404 },
        );
      }

      const finalServiceId = data.serviceId || existingAppt.serviceId;
      const finalStartTime = data.startTime || existingAppt.startTime;

      const finalStaffId =
        data.staffId !== undefined ? data.staffId : existingAppt.staffId;

      const service = await serviceModel.findById(finalServiceId);
      if (!service) throw new Error("Service not found");

      // 3. Recalculate End Time and Boundaries
      const startObj = new Date(finalStartTime);
      const endTimeStr = new Date(
        startObj.getTime() + service.durationMinutes * 60000,
      ).toISOString();

      const dayStart = new Date(
        new Date(startObj).setHours(0, 0, 0, 0),
      ).toISOString();
      const dayEnd = new Date(
        new Date(startObj).setHours(23, 59, 59, 999),
      ).toISOString();

      // CASE A: ASSIGNING TO A STAFF MEMBER
      if (finalStaffId) {
        const staff = await staffModel.findById(finalStaffId);
        if (!staff) throw new Error("Staff member not found");

        // Check Capacity
        const count = await appointmentModel.countDocuments({
          _id: { $ne: id }, // Exclude current appointment
          staffId: finalStaffId,
          startTime: { $gte: dayStart, $lte: dayEnd },
        });

        if (count >= staff.dailyCapacity) {
          return NextResponse.json(
            {
              success: false,
              error: {
                message: `DAILY_CAPACITY_EXCEEDED,(${count}/${staff.dailyCapacity})`,
              },
            },
            { status: 409 },
          );
        }

        // Check Conflicts
        const existingAppointments = await appointmentModel.find({
          _id: { $ne: id },
          staffId: finalStaffId,
          startTime: { $gte: dayStart, $lte: dayEnd },
        });

        const conflict = existingAppointments.find((a) =>
          hasTimeOverlap(finalStartTime, endTimeStr, a.startTime, a.endTime),
        );

        if (conflict) {
          return NextResponse.json(
            {
              success: false,
              error: {
                message: `${staff.name} is already booked at this time.`,
              },
            },
            { status: 400 },
          );
        }

        // Apply Updates
        const updatedAppointment = await appointmentModel
          .findOneAndUpdate(
            { _id: id },
            {
              ...data,
              endTime: endTimeStr,
              staffId: finalStaffId,
              serviceId: finalServiceId,
              startTime: finalStartTime,
            },
            { new: true },
          )
          .populate(["serviceId", "staffId"]);

        return NextResponse.json({
          success: true,
          data: updatedAppointment,
          message: "Appointment updated successfully",
        });
      } else {
        // CASE B: MOVING TO WAITING QUEUE (Staff unassigned)
        const queueEntry = await waitingQueueModel.create({
          customerName: data.customerName || existingAppt.customerName,
          serviceId: finalServiceId,
          startTime: finalStartTime,
          endTime: endTimeStr,
          orgId: req.user.orgId,
          status: "QUEUED",
        });

        // Delete the original appointment since it's now a queue entry
        await appointmentModel.deleteOne({ _id: id });

        return NextResponse.json(
          {
            success: true,
            data: queueEntry,
            message: "Staff unassigned. Moved to Waiting Queue.",
          },
          { status: 201 },
        );
      }
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: error.errors.map((e: any) => e.message).join(", "),
            },
          },
          { status: 422 },
        );
      }
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 500 },
      );
    }
  },
);
