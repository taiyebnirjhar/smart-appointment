import { createToastHandler } from "@/lib/onquery-toast";
import { baseApi } from "@/redux/base-api";
import { TAG_TYPES } from "@/redux/tag-types";
import { IAppointment } from "@/types/api-response/api-response";
import { IMeta, IQuery } from "@/types/common/common";

const URL = "/appointment";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<
      { appointments: IAppointment[]; meta: IMeta },
      { params?: IQuery } | void
    >({
      query: (arg) => ({
        url: URL,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IAppointment[]; meta: IMeta }) => ({
        appointments: response.data,
        meta: response.meta,
      }),
      providesTags: [TAG_TYPES.APPOINTMENT],
    }),

    getSingleAppointment: builder.query<
      { appointment: IAppointment },
      { id: string; params?: IQuery }
    >({
      query: (arg) => ({
        url: URL + "/" + arg?.id,
        method: "GET",
        params: arg?.params,
      }),
      transformResponse: (response: { data: IAppointment }) => ({
        appointment: response.data,
      }),
      providesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.APPOINTMENT, id: arg?.id },
      ],
    }),

    createAppointment: builder.mutation({
      query: (arg: { data: Partial<IAppointment> }) => ({
        url: URL + "/create",
        method: "POST",
        data: arg.data,
      }),

      invalidatesTags: [
        TAG_TYPES.APPOINTMENT,
        TAG_TYPES.DASHBOARD,
        TAG_TYPES.STAFF_LOAD,
        TAG_TYPES.ACTIVITY_LOG,
        TAG_TYPES.WAITING_LIST,
      ],
      onQueryStarted: createToastHandler({
        loading: "Processing appointment...",
        success: "Success! Check your appointment list",
        error: "Scheduling conflict occurred",
      }),
    }),

    updateAppointment: builder.mutation<
      IAppointment,
      { id: string; data: Partial<IAppointment> }
    >({
      query: (arg) => ({
        url: `${URL}/edit/${arg.id}`,
        method: "PATCH",
        data: arg.data,
      }),
      invalidatesTags: [
        TAG_TYPES.APPOINTMENT,
        TAG_TYPES.DASHBOARD,
        TAG_TYPES.STAFF_LOAD,
        TAG_TYPES.ACTIVITY_LOG,
        TAG_TYPES.WAITING_LIST,
      ],
      onQueryStarted: createToastHandler({
        loading: "Updating details...",
        success: "Appointment updated",
        error: "Could not update appointment",
      }),
    }),

    cancelAppointment: builder.mutation<IAppointment, { id: string }>({
      query: (arg) => ({
        url: `${URL}/cancel/${arg.id}`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: TAG_TYPES.APPOINTMENT, id: arg.id },
        TAG_TYPES.APPOINTMENT,
        TAG_TYPES.DASHBOARD,
        TAG_TYPES.WAITING_LIST,
      ],
      onQueryStarted: createToastHandler({
        loading: "Cancelling...",
        success: "Appointment cancelled",
        error: "Already cancelled or not found",
      }),
    }),

    deleteAppointment: builder.mutation({
      query: (arg) => ({
        url: `${URL}/delete/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.APPOINTMENT, TAG_TYPES.DASHBOARD],
      onQueryStarted: createToastHandler({
        loading: "Deleting record...",
        success: "Record deleted",
        error: "Delete failed",
      }),
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetSingleAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
