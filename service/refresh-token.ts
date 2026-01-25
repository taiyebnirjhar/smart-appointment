/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios/axios-instance";
import { jwtDecode } from "jwt-decode";

async function refreshAccessToken(token: any) {
  // console.log(token);
  try {
    const res: any = await axiosInstance({
      url: "/auth/refresh-access-token",
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
      method: "POST",
    });

    // console.log(res);

    if (!res?.data?.accessToken) {
      // console.log("No access token returned during refresh");
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    const decodedToken: any = jwtDecode(res.data.accessToken);

    console.log("Token refreshed successfully");
    return {
      ...token,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken ?? token.refreshToken,
      accessTokenExpires: decodedToken.exp,
      user: { ...decodedToken },
      error: undefined,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default refreshAccessToken;
