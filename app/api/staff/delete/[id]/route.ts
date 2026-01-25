/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { staffModel } from "@/models/staff/staff.model";
import { NextResponse } from "next/server";

export const DELETE = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;

      await connectDB();

      const staff = await staffModel.findOneAndDelete({
        _id: id,
        orgId: req.user.orgId,
      });

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
          message: "Staff deleted successfully",
        },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: { message: error.message || "Failed to delete staff" },
        },
        { status: 500 },
      );
    }
  },
);
