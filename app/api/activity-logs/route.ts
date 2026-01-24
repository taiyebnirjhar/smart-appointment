/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { QueryBuilder } from "@/lib/query-builder";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { activityLogModel } from "@/models/activity/activity.model";

import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { NextResponse } from "next/server";

export const GET = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    await connectDB();

    const query = new QueryBuilder(
      activityLogModel.find({ orgId: req.user.orgId }),
      Object.fromEntries(new URL(req.url).searchParams),
    )
      .search(["message", "actionType"])
      .filter()
      .sort()
      .fields()
      .populate()
      .paginate();

    const total = await query.countTotal(activityLogModel);
    const meta = query.getMeta(total);

    const data = await query.exec();

    const successResponse: IGenericSuccessResponse<typeof data> = {
      success: true,
      data,
      meta,
      message: "Activity logs retrieved successfully",
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: any) {
    const errorResponse: IGenericErrorResponse = {
      success: false,
      error: { message: error.message || "Failed to retrieve activity logs" },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
});
