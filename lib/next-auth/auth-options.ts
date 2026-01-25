/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginWithCredential } from "@/actions/auth-actions";
import { envConfig } from "@/config/env-config";
import { login_credential } from "@/constant/credential-id";

import refreshAccessToken from "@/service/refresh-token";
import { jwtDecode } from "jwt-decode";
import { AuthOptions, CallbacksOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";

const providers: Provider[] = [
  CredentialsProvider({
    id: login_credential,
    name: "Credentials",
    type: "credentials",
    credentials: {},
    authorize: async (credentials: any) => {
      try {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("please enter email or password");
        }

        const { data } = await loginWithCredential({ email, password });

        const verifiedToken: any = jwtDecode(data?.accessToken);

        if (data?.accessToken && verifiedToken) {
          return {
            id: verifiedToken?.userId,
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
            user: {
              ...verifiedToken,
            },
          };
        }

        throw new Error(data?.error?.message || "Something went wrong");
      } catch (error: any) {
        throw new Error(error?.message || "Something went wrong");
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  jwt: async ({ token, account, user }: any) => {
    if (account && user) {
      return {
        ...token,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        user: { ...user?.user },
        accessTokenExpires: user.user?.exp,
      };
    }

    // Check if there was an error from previous refresh attempt
    if (token.error === "RefreshAccessTokenError") {
      return token;
    }

    // Add a buffer time (30 seconds) to refresh token before it expires
    const shouldRefresh = token.accessTokenExpires
      ? Date.now() / 1000 + 30 >= token.accessTokenExpires
      : true;

    if (!shouldRefresh) {
      return token;
    }

    // console.log("Refreshing token...", token);
    return refreshAccessToken(token);
  },
  redirect: async ({ url }) => {
    const baseUrl = envConfig.siteUrl;
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  session: async ({ session, token }: any) => {
    if (token) {
      session.accessToken = token.accessToken;
      session.user = { ...token.user };
      session.error = token.error;
    }

    return Promise.resolve(session);
  },
};

export const authOptions: AuthOptions = {
  providers,
  callbacks,
  pages: { signIn: "/sign-in", signOut: "*", error: "/" },
  secret: envConfig.jwt.secret,
  session: {
    strategy: "jwt",
    maxAge: Number(envConfig.jwt.accessTokenExpiresIn) || 0,
  },
};

export default authOptions;
