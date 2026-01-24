/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { QueryBuilder } from "@/lib/query-builder";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { serviceModel } from "@/models/service/service.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { NextResponse } from "next/server";

export const GET = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    await connectDB();

    const query = new QueryBuilder(
      serviceModel.find({ orgId: req.user.orgId }),
      Object.fromEntries(new URL(req.url).searchParams),
    )
      .search(["name", "requiredStaffType"])
      .filter()
      .sort()
      .fields()
      .populate()
      .paginate();

    const total = await query.countTotal(serviceModel);
    const meta = query.getMeta(total);

    const data = await query.exec();

    const successResponse: IGenericSuccessResponse<typeof data> = {
      success: true,
      data,
      meta,
      message: "Services retrieved successfully",
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: any) {
    const errorResponse: IGenericErrorResponse = {
      success: false,
      error: { message: error.message || "Failed to retrieve services" },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
});
