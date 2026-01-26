import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IDashboardStats } from "@/types/api-response/api-response";

const DASHBOARD_URL = "/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Dashboard Metrics
    getDashboardStats: builder.query<IDashboardStats, void>({
      query: () => ({
        url: DASHBOARD_URL,
        method: "GET",
      }),
      transformResponse: (response: { data: IDashboardStats }) => {
        return response.data;
      },
      // The dashboard should refetch if staff, appointments, or queues change
      providesTags: [
        TAG_TYPES.APPOINTMENT,
        TAG_TYPES.STAFF,
        TAG_TYPES.WAITING_LIST,
        TAG_TYPES.STAFF_LOAD,
      ],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
