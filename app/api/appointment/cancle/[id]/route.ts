/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { activityLogModel } from "@/models/activity/activity.model";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { NextResponse } from "next/server";

export const PATCH = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;

      await connectDB();

      // We use findOneAndUpdate to ensure the appointment belongs to the user's org
      const appointment = await appointmentModel
        .findOneAndUpdate(
          {
            _id: id,
            orgId: req.user.orgId,
            status: { $ne: "CANCELLED" }, // Prevent cancelling an already cancelled appointment
          },
          {
            $set: { status: "CANCELLED" },
          },
          { new: true },
        )
        .populate(["staffId", "serviceId"]);

      if (!appointment) {
        return NextResponse.json(
          {
            success: false,
            error: { message: "Appointment not found or already cancelled." },
          },
          { status: 404 },
        );
      }

      await activityLogModel.create({
        orgId: req.user.orgId,
        actionType: "APPOINTMENT_CANCELLED",
        message: `Appointment cancelled`,
        appointmentId: appointment._id,
      });

      return NextResponse.json(
        {
          success: true,
          data: appointment,
          message: `Appointment for ${appointment.customerName} has been cancelled.`,
        },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: { message: error.message || "Failed to cancel appointment" },
        },
        { status: 500 },
      );
    }
  },
);
