import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { IRegisterPayload } from "@/types/api-payload/api-payload";

const url = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (arg: { data: IRegisterPayload }) => ({
        url: url + "/register",
        method: "POST",
        data: arg.data,
      }),
      onQueryStarted: createToastHandler({
        loading: "Registering new user...",
        success: "User registered successfully",
        error: "Failed to register user",
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
