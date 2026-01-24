/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { serviceModel } from "@/models/service/service.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { createServiceSchema } from "@/validators/service/service.validator";
import { NextResponse } from "next/server";

export const POST = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    // console.log(body);
    const data = createServiceSchema.parse(body);
    // console.log(data);
    await connectDB();

    const service = await serviceModel.create({
      name: data.name,
      durationMinutes: data.durationMinutes,
      requiredStaffType: data.requiredStaffType,
      orgId: req.user.orgId,
    });

    // console.log(service);
    const successResponse: IGenericSuccessResponse<typeof service> = {
      success: true,
      data: service,
      message: "Service created successfully",
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error: any) {
    // Handle Zod errors specifically
    if (error.name === "ZodError") {
      const zodErrorResponse: IGenericErrorResponse = {
        success: false,
        error: {
          message:
            error?.errors
              ?.map((e: any) => `${e.path.join(".")}: ${e.message}`)
              .join(", ") || "Validation failed",
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
