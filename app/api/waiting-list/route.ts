/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { QueryBuilder } from "@/lib/query-builder/query-builder";
import { serviceModel } from "@/models/service/service.model";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";

import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { NextResponse } from "next/server";

export const GET = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    await connectDB();

    const searchParams = Object.fromEntries(new URL(req.url).searchParams);
    const searchTerm = searchParams.search as string;

    let extraFilters = {};

    if (searchTerm) {
      // Find matching service IDs
      const services = await serviceModel
        .find({
          name: { $regex: searchTerm, $options: "i" },
          orgId: req.user.orgId,
        })
        .select("_id");

      const serviceIds = services.map((s) => s._id);

      // Build the search condition
      extraFilters = {
        $or: [
          { customerName: { $regex: searchTerm, $options: "i" } },
          { serviceId: { $in: serviceIds } },
        ],
      };
    }

    const query = new QueryBuilder(
      waitingQueueModel.find({
        orgId: req.user.orgId,
        status: "QUEUED",
        ...extraFilters,
      }),
      searchParams,
    )
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
