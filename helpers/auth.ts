import { envConfig } from "@/config/env-config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/* eslint-disable @typescript-eslint/no-explicit-any */

export function generateToken(payload: any, type: "access" | "refresh") {
  const expiresIn =
    type === "access"
      ? envConfig.jwt.accessTokenExpiresIn
      : envConfig.jwt.refreshTokenExpiresIn;

  return jwt.sign(payload, envConfig.jwt.secret, {
    expiresIn: expiresIn as any,
  });
}

export async function hashRefreshToken(token: string) {
  return bcrypt.hash(token, envConfig.BCRYPT_SALT_ROUNDS);
}

export async function isValidRefreshToken(token: string, hashedTokens: any[]) {
  if (!hashedTokens || hashedTokens.length === 0) return false;

  for (const t of hashedTokens) {
    if (!t.token) continue;
    const valid = await bcrypt.compare(token, t.token);
    if (valid) {
      return true;
    }
  }

  return false;
}

export function extractToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return undefined;

  return authHeader.split(" ")[1];
}
