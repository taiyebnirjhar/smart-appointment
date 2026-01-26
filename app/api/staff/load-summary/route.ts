/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { staffModel } from "@/models/staff/staff.model";
import { IGenericSuccessResponse } from "@/types/common/common";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = withOrgAuth(async (req: AuthenticatedRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const isoDate = searchParams.get("date");

    if (!isoDate) {
      throw new Error("Date parameter is required");
    }

    const startObj = new Date(isoDate);
    const dayStart = new Date(startObj.setHours(0, 0, 0, 0)).toISOString();
    const dayEnd = new Date(startObj.setHours(23, 59, 59, 999)).toISOString();

    const staffLoadData = await staffModel.aggregate([
      {
        // Filter by organization
        $match: { orgId: new mongoose.Types.ObjectId(req.user.orgId) },
      },
      {
        // Look up appointments for this staff within the time range
        $lookup: {
          from: "appointment",
          let: { staff_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$staffId", "$$staff_id"] },
                    { $eq: ["$status", "SCHEDULED"] },
                    { $gte: ["$startTime", dayStart] },
                    { $lte: ["$startTime", dayEnd] },
                  ],
                },
              },
            },
          ],
          as: "todaysAppointments",
        },
      },
      {
        // Project the final shape for your UI
        $project: {
          _id: 1,
          name: 1,
          staffType: 1,
          dailyCapacity: 1,
          availabilityStatus: 1,
          currentTaskCount: { $size: "$todaysAppointments" },
          isFull: {
            $gte: [{ $size: "$todaysAppointments" }, "$dailyCapacity"],
          },
        },
      },
      {
        // Add the virtual display badge string
        $addFields: {
          displayBadge: {
            $concat: [
              { $toString: "$currentTaskCount" },
              "/",
              { $toString: "$dailyCapacity" },
            ],
          },
        },
      },
    ]);

    const successResponse: IGenericSuccessResponse<typeof staffLoadData> = {
      success: true,
      data: staffLoadData,
      message: "Staff load summary retrieved successfully",
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
