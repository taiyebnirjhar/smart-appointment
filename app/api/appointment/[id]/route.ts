/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { NextResponse } from "next/server";

export const GET = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;
      await connectDB();

      const appointment = await appointmentModel.findOne({
        _id: id,
        orgId: req.user.orgId,
      });

      if (!appointment) {
        return NextResponse.json(
          { success: false, error: { message: "Appointment not found" } },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { success: true, data: appointment, message: "Appointment retrieved" },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 500 },
      );
    }
  },
);
