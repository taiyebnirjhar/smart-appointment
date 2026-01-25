/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { axiosInstance } from "@/lib/axios/axios-instance";
import { ILoginPayload } from "@/types/api-payload/api-payload";

const auth_url = "/auth";

export const loginWithCredential = async (
  body: ILoginPayload,
): Promise<any> => {
  const res = await axiosInstance({
    url: auth_url + "/login",
    method: "POST",
    data: body,
  });
  return res;
};
