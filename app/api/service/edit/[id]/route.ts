/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db/db";
import { AuthenticatedRequest, withOrgAuth } from "@/middleware/auth-guard";
import { serviceModel } from "@/models/service/service.model";
import { updateServiceSchema } from "@/validators/service/service.validator";
import { NextResponse } from "next/server";

export const PATCH = withOrgAuth<{ id: string }>(
  async (req: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;

      const body = await req.json();
      const data = updateServiceSchema.parse(body);

      await connectDB();

      const service = await serviceModel.findOneAndUpdate(
        { _id: id, orgId: req.user.orgId },
        { $set: data },
        { new: true },
      );

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
          message: "Service updated successfully",
        },
        { status: 200 },
      );
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: error.errors
                .map((e: any) => `${e.path.join(".")}: ${e.message}`)
                .join(", "),
            },
          },
          { status: 422 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: { message: error.message || "Failed to update service" },
        },
        { status: 500 },
      );
    }
  },
);
