/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { appointmentModel } from "@/models/appointment/appointment.model";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";
import { IGenericSuccessResponse } from "@/types/common/common";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    await connectDB();

    // 1. Setup Day Boundaries for "Today"
    const now = new Date();
    const dayStart = new Date(new Date(now).setHours(0, 0, 0, 0)).toISOString();
    const dayEnd = new Date(
      new Date(now).setHours(23, 59, 59, 999),
    ).toISOString();

    const orgId = new mongoose.Types.ObjectId(req.user.orgId);

    // 2. Fetch Metrics in Parallel
    const [totalToday, completedToday, pendingToday, waitingQueueCount] =
      await Promise.all([
        // Total appointments today (regardless of status)
        appointmentModel.countDocuments({
          orgId,
          startTime: { $gte: dayStart, $lte: dayEnd },
        }),
        // Completed appointments today
        appointmentModel.countDocuments({
          orgId,
          status: "COMPLETED",
          startTime: { $gte: dayStart, $lte: dayEnd },
        }),
        // Active/Pending appointments today
        appointmentModel.countDocuments({
          orgId,
          status: "SCHEDULED",
          startTime: { $gte: dayStart, $lte: dayEnd },
        }),
        // Everyone currently waiting in the queue
        waitingQueueModel.countDocuments({
          orgId,
          status: "QUEUED",
        }),
      ]);

    const statsData = {
      totalAppointmentsToday: totalToday,
      completedToday,
      pendingToday,
      waitingQueueCount,
    };

    const successResponse: IGenericSuccessResponse<typeof statsData> = {
      success: true,
      data: statsData,
      message: "Dashboard metrics retrieved successfully",
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { message: error.message || "Internal server error" },
      },
      { status: 500 },
    );
  }
});
