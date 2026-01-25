/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db/db";
import { hasTimeOverlap } from "@/lib/utils";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { serviceModel } from "@/models/service/service.model";
import { staffModel } from "@/models/staff/staff.model";
import { updateAppointmentSchema } from "@/validators/appointment/appointment.validator";
import { NextResponse } from "next/server";

export const PATCH = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;
      const body = await req.json();
      const data = updateAppointmentSchema.parse(body);

      await connectDB();

      // 1. Fetch current appointment to handle partial updates
      const currentAppt = await appointmentModel.findOne({
        _id: id,
        orgId: req.user.orgId,
      });
      if (!currentAppt) {
        return NextResponse.json(
          { success: false, error: { message: "Appointment not found" } },
          { status: 404 },
        );
      }

      const updateData: any = { ...data };

      // 2. Logic if Time or Service or Staff changes
      if (data.startTime || data.serviceId || data.staffId) {
        const finalServiceId = data.serviceId || currentAppt.serviceId;
        const finalStaffId = data.staffId || currentAppt.staffId;
        const finalStartTime = data.startTime || currentAppt.startTime;

        const service = await serviceModel.findById(finalServiceId);
        if (!service) throw new Error("Service not found");

        // Recalculate End Time
        const startObj = new Date(finalStartTime);
        const endTimeStr = new Date(
          startObj.getTime() + service.durationMinutes * 60000,
        ).toISOString();
        updateData.endTime = endTimeStr;

        // Boundaries for conflict/capacity checks
        const dayStart = new Date(
          new Date(startObj).setHours(0, 0, 0, 0),
        ).toISOString();
        const dayEnd = new Date(
          new Date(startObj).setHours(23, 59, 59, 999),
        ).toISOString();

        if (finalStaffId) {
          const staff = await staffModel.findById(finalStaffId);
          if (!staff) throw new Error("Staff member not found");

          // Check Capacity (Exclude current appointment from count)
          const count = await appointmentModel.countDocuments({
            _id: { $ne: id }, // Don't count the appointment we are currently editing
            staffId: finalStaffId,
            startTime: { $gte: dayStart, $lte: dayEnd },
          });

          if (count >= staff.dailyCapacity) {
            return NextResponse.json(
              {
                success: false,
                error: {
                  message: `${staff.name} is at full capacity (${count}/${staff.dailyCapacity}).`,
                },
              },
              { status: 400 },
            );
          }

          // Check Conflicts (Exclude current appointment from conflict check)
          const existingAppointments = await appointmentModel.find({
            _id: { $ne: id },
            staffId: finalStaffId,
            startTime: { $gte: dayStart, $lte: dayEnd },
          });

          const conflict = existingAppointments.find((a) =>
            hasTimeOverlap(finalStartTime, endTimeStr, a.startTime, a.endTime),
          );

          if (conflict) {
            const formatTime = (iso: string) =>
              iso.split("T")[1].substring(0, 5);
            return NextResponse.json(
              {
                success: false,
                error: {
                  message: `${staff.name} is busy from ${formatTime(conflict.startTime)} to ${formatTime(conflict.endTime)}.`,
                },
              },
              { status: 400 },
            );
          }
        }
      }

      // 3. Apply Updates
      const updatedAppointment = await appointmentModel
        .findOneAndUpdate(
          { _id: id, orgId: req.user.orgId },
          { $set: updateData },
          { new: true },
        )
        .populate(["serviceId", "staffId"]);

      return NextResponse.json(
        {
          success: true,
          data: updatedAppointment,
          message: "Appointment updated successfully",
        },
        { status: 200 },
      );
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
