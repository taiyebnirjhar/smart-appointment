import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IService } from "@/types/api-response/api-response";
import { IMeta, IQuery } from "@/types/common/common";

const url = "/service";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create Service
    createService: builder.mutation({
      query: (arg: { data: Partial<IService> }) => ({
        url: `${url}/create`,
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.SERVICE],
      onQueryStarted: createToastHandler({
        loading: "Creating service...",
        success: "Service created successfully",
        error: "Failed to create service",
      }),
    }),

    // 2. Get All Services (with pagination/filtering)
    getServices: builder.query<
      { services: Partial<IService>[]; meta: IMeta },
      { params?: IQuery } | void
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: {
        data: Partial<IService>[];
        meta: IMeta;
      }) => {
        return {
          services: response.data,
          meta: response.meta,
        };
      },
      providesTags: [TAG_TYPES.SERVICE],
    }),

    // 3. Get Single Service
    getSingleService: builder.query<
      { service: Partial<IService> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: `${url}/${arg?.id}`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: Partial<IService> }) => {
        return {
          service: response.data,
        };
      },
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.SERVICE, id: arg.id },
      ],
    }),

    // 4. Update Service
    updateService: builder.mutation({
      query: (arg: { id: string; data: Partial<IService> }) => ({
        url: `${url}/update/${arg.id}`,
        method: "PATCH",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.SERVICE, id: arg.id },
        TAG_TYPES.SERVICE,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating service...",
        success: "Service updated successfully",
        error: "Failed to update service",
      }),
    }),

    // 5. Delete Service
    deleteService: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `${url}/delete/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.SERVICE],
      onQueryStarted: createToastHandler({
        loading: "Deleting service...",
        success: "Service deleted successfully",
        error: "Failed to delete service",
      }),
    }),
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

// Export hooks for usage in components
export const {
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
