/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateToken, hashRefreshToken } from "@/helpers/auth";
import connectDB from "@/lib/db";
import { userModel } from "@/models/user/user.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import { loginSchema } from "@/validators/auth/auth.validator";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    // ** Connect to DB
    await connectDB();

    // ** Check for existing user
    const user = await userModel.findOne({ email: data.email });

    if (!user) {
      const errorResponse: IGenericErrorResponse = {
        success: false,
        error: { message: "User not found" },
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // ** Verify password
    const valid = await bcrypt.compare(data.password, user.passwordHash);

    if (!valid) {
      const errorResponse: IGenericErrorResponse = {
        success: false,
        error: { message: "Invalid password" },
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }

    const tokenPayload = {
      userId: user._id.toString(),
      orgId: user.orgId?.toString(),
      name: user.name,
      email: user.email,
    };
    // ** Generate Access token
    const accessToken = generateToken(tokenPayload, "access");

    // ** Generate Refresh token
    const refreshToken = generateToken(tokenPayload, "refresh");

    // Store refresh token in DB
    const hashedRefreshToken = await hashRefreshToken(refreshToken);
    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push({ token: hashedRefreshToken });
    await user.save();

    // ** Return success response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          refreshToken,
        },
      } as IGenericSuccessResponse<{
        accessToken: string;
        refreshToken: string;
      }>,
      { status: 200 },
    );

    return response;
  } catch (error: any) {
    // Handle Zod validation errors
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
