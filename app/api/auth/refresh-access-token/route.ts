/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/config/env-config";
import {
  extractToken,
  generateToken,
  hashRefreshToken,
  isValidRefreshToken,
} from "@/helpers/auth";
import connectDB from "@/lib/db";
import { userModel } from "@/models/user/user.model";
import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const oldRefreshToken = extractToken(req);

    if (!oldRefreshToken) {
      return NextResponse.json(
        { success: false, error: { message: "Refresh token not provided" } },
        { status: 401 },
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(oldRefreshToken, envConfig.jwt.secret);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: { message: error?.message || "Invalid refresh token" },
        } as IGenericErrorResponse,
        { status: 401 },
      );
    }

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "User not found" },
        } as IGenericErrorResponse,
        { status: 404 },
      );
    }

    // Compare refresh token with hashed one stored in DB
    const valid = await isValidRefreshToken(
      oldRefreshToken,
      user.refreshTokens,
    );
    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Refresh token is invalid or revoked" },
        } as IGenericErrorResponse,
        { status: 403 },
      );
    }

    const payload = {
      userId: user._id.toString(),
      orgId: user.orgId?.toString(),
      name: user.name,
      email: user.email,
    };

    const accessToken = generateToken(payload, "access");
    const newRefreshToken = generateToken(payload, "refresh");
    const hashedNewRefreshToken = await hashRefreshToken(newRefreshToken);

    // Replace old refresh token
    const remainingTokens = [];

    for (const t of user.refreshTokens) {
      const isMatch = await bcrypt.compare(oldRefreshToken, t.token);
      if (!isMatch) {
        remainingTokens.push(t);
      }
    }

    user.refreshTokens = remainingTokens;

    user.refreshTokens.push({ token: hashedNewRefreshToken });
    await user.save();

    const response = NextResponse.json(
      {
        success: true,
        message: "Access token refreshed successfully",
        data: { accessToken, refreshToken: newRefreshToken },
      } as IGenericSuccessResponse<{
        accessToken: string;
        refreshToken: string;
      }>,
      { status: 200 },
    );

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { message: error?.message || "Failed to refresh access token" },
      } as IGenericErrorResponse,
      { status: 500 },
    );
  }
}
