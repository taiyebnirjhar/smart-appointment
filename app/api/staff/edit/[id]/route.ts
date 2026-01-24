/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { staffModel } from "@/models/staff/staff.model";
import { updateStaffSchema } from "@/validators/staff/staff.validator";
import { NextResponse } from "next/server";

export const PATCH = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;

      const body = await req.json();
      const data = updateStaffSchema.parse(body);

      await connectDB();

      const staff = await staffModel.findOneAndUpdate(
        { _id: id, orgId: req.user.orgId },
        { $set: data },
        { new: true },
      );

      if (!staff) {
        return NextResponse.json(
          {
            success: false,
            error: { message: "Staff not found" },
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: staff,
          message: "Staff updated successfully",
        },
        { status: 200 },
      );
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: error.errors
                .map((e: any) => `${e.path.join(".")}: ${e.message}`)
                .join(", "),
            },
          },
          { status: 422 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: { message: error.message || "Failed to update staff" },
        },
        { status: 500 },
      );
    }
  },
);
