/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/config/env-config";
import { extractToken } from "@/helpers/auth";
import { IGenericErrorResponse } from "@/types/common/common";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export interface AuthenticatedUser {
  userId: string;
  orgId?: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
export interface RouteContext<TParams = any> {
  params?: TParams;
}

/**
 * Auth guard middleware to protect API routes
 * @param handler - The route handler function
 * @returns Protected route handler
 */
export function withAuth<TParams = any>(
  handler: (
    req: AuthenticatedRequest,
    ctx: RouteContext<TParams>,
  ) => Promise<NextResponse>,
) {
  return async (
    req: Request,
    ctx: RouteContext<TParams>,
  ): Promise<NextResponse> => {
    try {
      // Extract token
      const token = extractToken(req);

      if (!token) {
        const errorResponse: IGenericErrorResponse = {
          success: false,
          error: { message: "Access token not provided" },
        };
        return NextResponse.json(errorResponse, { status: 401 });
      }

      // Verify token
      let decoded: any;
      try {
        decoded = jwt.verify(token, envConfig.jwt.secret);
      } catch (error: any) {
        const errorResponse: IGenericErrorResponse = {
          success: false,
          error: {
            message: error?.message || "Invalid or expired access token",
          },
        };
        return NextResponse.json(errorResponse, { status: 401 });
      }

      // Validate decoded payload
      if (!decoded.userId || !decoded.email || !decoded.name) {
        const errorResponse: IGenericErrorResponse = {
          success: false,
          error: { message: "Invalid token payload" },
        };
        return NextResponse.json(errorResponse, { status: 401 });
      }

      // Attach user to request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = {
        userId: decoded.userId,
        orgId: decoded.orgId,
        name: decoded.name,
        email: decoded.email,
      };

      // Call the actual handler
      return await handler(authenticatedReq, ctx);
    } catch (error: any) {
      const errorResponse: IGenericErrorResponse = {
        success: false,
        error: { message: error?.message || "Authentication failed" },
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }
  };
}

/**
 * Optional: Organization-specific auth guard
 * Ensures user belongs to a specific organization
 */
export function withOrgAuth<TParams = any>(
  handler: (
    req: AuthenticatedRequest,
    ctx: RouteContext<TParams>,
  ) => Promise<NextResponse>,
) {
  return withAuth<TParams>(
    async (req: AuthenticatedRequest, ctx: RouteContext<TParams>) => {
      if (!req.user.orgId) {
        const errorResponse: IGenericErrorResponse = {
          success: false,
          error: { message: "User is not associated with any organization" },
        };
        return NextResponse.json(errorResponse, { status: 403 });
      }

      return await handler(req, ctx);
    },
  );
}

/**
 * Optional: Extract orgId from request body or query and validate against user's orgId
 */
export function validateOrgAccess(
  userOrgId: string | undefined,
  requestOrgId: string | undefined,
): boolean {
  if (!userOrgId || !requestOrgId) return false;
  return userOrgId === requestOrgId;
}
