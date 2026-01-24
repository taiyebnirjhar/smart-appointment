/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { serviceModel } from "@/models/service/service.model";
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

      const service = await serviceModel.findOne({
        _id: id,
        orgId: req.user.orgId,
      });

      if (!service) {
        return NextResponse.json(
          {
            success: false,
            error: { message: "Service not found" },
          } satisfies IGenericErrorResponse,
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: service,
          message: "Service retrieved successfully",
        } satisfies IGenericSuccessResponse<typeof service>,
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
