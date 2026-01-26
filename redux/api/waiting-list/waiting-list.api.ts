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

    deleteQueueItem: builder.mutation({
      query: (arg) => ({
        url: `${url}/delete/${arg.id}`,
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
});

export const { useGetQueuedItemsQuery, useDeleteQueueItemMutation } =
  waitingQueueApi;
