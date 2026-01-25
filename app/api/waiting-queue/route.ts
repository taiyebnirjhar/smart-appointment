/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db/db";
import { QueryBuilder } from "@/lib/query-builder/query-builder";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";

import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { NextResponse } from "next/server";

export const GET = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    await connectDB();

    const query = new QueryBuilder(
      waitingQueueModel.find({ orgId: req.user.orgId, status: "QUEUED" }),
      Object.fromEntries(new URL(req.url).searchParams),
    )
      .search(["customerName"])
      .filter()
      .sort()
      .fields()
      .populate()
      .paginate();

    const total = await query.countTotal(waitingQueueModel);
    const meta = query.getMeta(total);
    const data = await query.exec();

    const successResponse: IGenericSuccessResponse<typeof data> = {
      success: true,
      data,
      meta,
      message: "Queue retrieved successfully",
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: any) {
    const errorResponse: IGenericErrorResponse = {
      success: false,
      error: { message: error.message || "Failed to retrieve queue" },
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
});
