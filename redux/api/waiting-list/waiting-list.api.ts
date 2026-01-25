/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IWaitingQueueItem } from "@/types/api-response/api-response";
import { IMeta, IQuery } from "@/types/common/common";

const url = "/waiting-list";

export const waitingQueueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQueuedItems: builder.query<
      { queue: IWaitingQueueItem[]; meta: IMeta },
      { params?: IQuery } | void
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: {
        data: IWaitingQueueItem[];
        meta: IMeta;
      }) => {
        return {
          queue: response.data,
          meta: response.meta,
        };
      },
      providesTags: [TAG_TYPES.WAITING_LIST],
    }),

    assignStaff: builder.mutation<any, { id: string; staffId: string }>({
      query: (arg) => ({
        url: `${url}/${arg.id}`,
        method: "PATCH",
        data: { staffId: arg.staffId },
      }),

      invalidatesTags: [
        TAG_TYPES.WAITING_LIST,
        TAG_TYPES.APPOINTMENT,
        TAG_TYPES.DASHBOARD,
        TAG_TYPES.STAFF_LOAD,
        TAG_TYPES.ACTIVITY_LOG,
      ],
      onQueryStarted: createToastHandler({
        loading: "Assigning staff...",
        success: "Staff assigned successfully",
        error: "Failed to assign staff",
      }),
    }),

    removeQueueItem: builder.mutation({
      query: (id: string) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.WAITING_LIST, TAG_TYPES.DASHBOARD],
      onQueryStarted: createToastHandler({
        loading: "Removing from queue...",
        success: "Item removed successfully",
        error: "Failed to remove item",
      }),
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useGetQueuedItemsQuery,
  useAssignStaffMutation,
  useRemoveQueueItemMutation,
} = waitingQueueApi;
