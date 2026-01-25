/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { staffModel } from "@/models/staff/staff.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { createStaffSchema } from "@/validators/staff/staff.validator";
import { NextResponse } from "next/server";

export const POST = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const data = createStaffSchema.parse(body);

    await connectDB();

    const staff = await staffModel.create({
      name: data.name,
      staffType: data.staffType,
      dailyCapacity: data.dailyCapacity,
      availabilityStatus: data.availabilityStatus,
      orgId: req.user.orgId,
    });

    const successResponse: IGenericSuccessResponse<typeof staff> = {
      success: true,
      data: staff,
      message: "Staff registered successfully",
    };

    return NextResponse.json(successResponse, { status: 201 });
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
