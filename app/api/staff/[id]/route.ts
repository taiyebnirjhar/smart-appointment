/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { staffModel } from "@/models/staff/staff.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { NextResponse } from "next/server";

export const GET = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;

      await connectDB();

      const staff = await staffModel.findOne({
        _id: id,
        orgId: req.user.orgId,
      });

      if (!staff) {
        return NextResponse.json(
          {
            success: false,
            error: { message: "Staff not found" },
          } satisfies IGenericErrorResponse,
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: staff,
          message: "Staff retrieved successfully",
        } satisfies IGenericSuccessResponse<typeof staff>,
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: { message: error.message || "Failed to retrieve staff" },
        },
        { status: 500 },
      );
    }
  },
);
