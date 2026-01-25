/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { serviceModel } from "@/models/service/service.model";
import { NextResponse } from "next/server";

export const DELETE = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;

      await connectDB();

      const service = await serviceModel.findOneAndDelete({
        _id: id,
        orgId: req.user.orgId,
      });

      if (!service) {
        return NextResponse.json(
          {
            success: false,
            error: { message: "Service not found" },
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: service,
          message: "Service deleted successfully",
        },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: { message: error.message || "Failed to delete service" },
        },
        { status: 500 },
      );
    }
  },
);
