/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticatedRequest, withOrgAuth } from "@/lib/auth-guard/auth-guard";
import connectDB from "@/lib/db/db";
import { waitingQueueModel } from "@/models/waiting-queue/waiting-queue.model";
import { NextResponse } from "next/server";

export const DELETE = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;
      await connectDB();

      const deletedItem = await waitingQueueModel.findOneAndDelete({
        _id: id,
        orgId: req.user.orgId,
      });

      if (!deletedItem) {
        return NextResponse.json(
          { success: false, error: { message: "Queue item not found" } },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        data: deletedItem,
        message: "Queue item removed successfully",
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 500 },
      );
    }
  },
);
