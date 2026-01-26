import { envConfig } from "@/config/env-config";

import {
  IGenericErrorResponse,
  IGenericSuccessResponse,
} from "@/types/common/common";
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: envConfig.backendUrl,
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 100000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    // => Header Bearer Token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await getSession();

    if (session) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptors
axiosInstance.interceptors.response.use(
  function (response) {
    if (response.config.responseType === "blob") {
      return response.data;
    }

    const responseObject: IGenericSuccessResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      success: response?.data?.success,
      message: response?.data?.message,
    };
    return responseObject;
  },

  async function (error) {
    const responseObject: IGenericErrorResponse = {
      error: {
        message:
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          "Something went wrong",
      },
      success: error.response?.data?.success || false,
    };
    return responseObject;
  },
);

export { axiosInstance };
