/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { organizationModel } from "@/models/organization/organization.model";
import { userModel } from "@/models/user/user.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { registerSchema } from "@/validators/auth/auth.validator";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ** Parse and validate request body
    const body = await req.json();
    const data = registerSchema.parse(body);

    // ** Connect to DB
    await connectDB();

    // ** Check for existing user
    const existing = await userModel.findOne({ email: data.email });

    if (existing) {
      const errorResponse: IGenericErrorResponse = {
        success: false,
        error: { message: "User already exists" },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // ** Create organization
    const org = await organizationModel.create({
      name: data.orgName,
    });

    // ** Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // ** Create user
    const userDoc = await userModel.create({
      name: data.name,
      email: data.email,
      passwordHash: passwordHash,
      orgId: org._id,
    });

    // ** Convert to plain object and omit password
    const user = userDoc.toObject();
    delete user.passwordHash;

    // ** Return success response using generic type
    const successResponse: IGenericSuccessResponse<typeof user> = {
      success: true,
      data: user,
      message: "User registered successfully",
    };
    return NextResponse.json(successResponse, { status: 201 });
  } catch (error: any) {
    // Handle Zod errors specifically
    if (error.name === "ZodError") {
      const zodErrorResponse: IGenericErrorResponse = {
        success: false,
        error: {
          message: error.errors
            .map((e: any) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
        },
      };
      return NextResponse.json(zodErrorResponse, { status: 422 });
    }

    // Generic server error
    const errorResponse: IGenericErrorResponse = {
      success: false,
      error: { message: error.message || "Internal server error" },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
