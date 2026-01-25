import { DefaultSession } from "next-auth";
import { TokenPayload } from "./types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    user: TokenPayload;
    accessTokenExpires?: number;
    error?: string;
  }
}
