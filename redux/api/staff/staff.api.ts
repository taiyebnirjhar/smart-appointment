/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IStaff, IStaffLoadSummary } from "@/types/api-response/api-response";
import { IMeta, IQuery } from "@/types/common/common";

const url = "/staff";

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaff: builder.mutation({
      query: (arg: { data: Partial<IStaff> }) => ({
        url: url + "/create",
        method: "POST",
        data: arg.data,
      }),
      invalidatesTags: [TAG_TYPES.STAFF],
      onQueryStarted: createToastHandler({
        loading: "Creating Staff...",
        success: "Staff created successfully",
        error: "Failed to create Staff",
      }),
    }),
    getStaffs: builder.query<
      { staffs: Partial<IStaff>[]; meta: IMeta },
      { params?: IQuery }
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: {
        data: Partial<IStaff>[];
        meta: IMeta;
      }) => {
        return {
          staffs: response.data,
          meta: response.meta,
        };
      },
      providesTags: [TAG_TYPES.STAFF],
    }),
    getSingleStaff: builder.query<
      { staff: Partial<IStaff> },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: url + "/" + arg?.id,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: Partial<IStaff> }) => {
        return {
          staff: response.data,
        };
      },
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.STAFF, id: arg.id },
      ],
    }),
    updateStaff: builder.mutation({
      query: (arg: { id: string; data: Partial<IStaff> }) => ({
        url: url + "/update" + "/" + arg.id,
        method: "PATCH",
        data: arg.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.STAFF, id: arg.id },
        TAG_TYPES.STAFF,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating Staff...",
        success: "Staff updated successfully",
        error: "Failed to update Staff",
      }),
    }),
    deleteStaff: builder.mutation({
      query: (arg: { id: string }) => ({
        url: url + "/delete" + "/" + arg.id,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.STAFF],
      onQueryStarted: createToastHandler({
        loading: "Deleting Staff...",
        success: "Staff deleted successfully",
        error: "Failed to delete Staff",
      }),
    }),
    getStaffLoadSummary: builder.query<
      { summaries: IStaffLoadSummary[]; meta: IMeta },
      { params?: IQuery } | void
    >({
      query: (arg) => ({
        url: `${url}/load-summary`,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: {
        data: IStaffLoadSummary[];
        meta: IMeta;
      }) => {
        return {
          summaries: response.data,
          meta: response.meta,
        };
      },
      // We use the STAFF tag so that if a staff member is deleted or updated,
      // the load summary automatically refreshes.
      providesTags: [TAG_TYPES.STAFF_LOAD, TAG_TYPES.STAFF],
    }),
  }),

  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useCreateStaffMutation,
  useGetStaffsQuery,
  useGetSingleStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
