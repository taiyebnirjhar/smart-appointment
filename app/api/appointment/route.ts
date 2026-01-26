/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { QueryBuilder } from "@/lib/query-builder/query-builder";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { serviceModel } from "@/models/service/service.model";
import { staffModel } from "@/models/staff/staff.model";
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

    const extraFilters: any = {};

    if (searchTerm) {
      // 1. Find matching service IDs
      const services = await serviceModel
        .find({
          name: { $regex: searchTerm, $options: "i" },
          orgId: req.user.orgId,
        })
        .select("_id");

      // 2. Find matching staff IDs
      const staffs = await staffModel
        .find({
          name: { $regex: searchTerm, $options: "i" },
          orgId: req.user.orgId,
        })
        .select("_id");

      const serviceIds = services.map((s) => s._id);
      const staffIds = staffs.map((s) => s._id);

      // 3. Build the search condition
      extraFilters.$or = [
        { customerName: { $regex: searchTerm, $options: "i" } },
        { serviceId: { $in: serviceIds } },
        { staffId: { $in: staffIds } },
      ];
    }

    if (searchParams.from || searchParams.to) {
      const dateFilter: any = {};
      if (searchParams.from) {
        dateFilter.$gte = searchParams.from;
      }
      if (searchParams.to) {
        // If it's a date range, 'to' should include the end of that day if it's just a date.
        // However, if we send full ISO strings (ending in T23:59:59), we don't need to adjust.
        dateFilter.$lte = searchParams.to;
      }
      extraFilters.startTime = dateFilter;
    }

    const query = new QueryBuilder(
      appointmentModel.find({ orgId: req.user.orgId, ...extraFilters }),
      searchParams,
    )
      .filter()
      .sort()
      .fields()
      .populate()
      .paginate();

    const total = await query.countTotal();
    const meta = query.getMeta(total);
    const data = await query.exec();

    const successResponse: IGenericSuccessResponse<typeof data> = {
      success: true,
      data,
      meta,
      message: "Appointments retrieved successfully",
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: any) {
    const errorResponse: IGenericErrorResponse = {
      success: false,
      error: { message: error.message || "Failed to retrieve appointments" },
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
});
