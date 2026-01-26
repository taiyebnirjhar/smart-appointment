import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
// Assuming IActivityLog interface exists in your types
import { IActivityLog } from "@/types/api-response/api-response";
import { IMeta, IQuery } from "@/types/common/common";

const url = "/activity-logs";

export const activityLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<
      { activities: Partial<IActivityLog>[]; meta: IMeta },
      { params?: IQuery } | void
    >({
      query: (arg) => ({
        url: url,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: {
        data: Partial<IActivityLog>[];
        meta: IMeta;
      }) => {
        return {
          activities: response.data,
          meta: response.meta,
        };
      },
      providesTags: [
        TAG_TYPES.ACTIVITY_LOG,
        TAG_TYPES.DASHBOARD,
        TAG_TYPES.STAFF_LOAD,
        TAG_TYPES.WAITING_LIST,
        TAG_TYPES.APPOINTMENT,
      ],
    }),
  }),
});

// Export hooks for usage in components
export const { useGetActivitiesQuery } = activityLogApi;
