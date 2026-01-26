/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface ToastHandlerOptions {
  loading: string;
  success?: string;
  error?: string;
}

export const onQueryStartedToast = async (
  messages: ToastHandlerOptions,
  queryFulfilled: Promise<any>,
) => {
  const toastId = toast.loading(messages.loading);
  try {
    const response = await queryFulfilled;
    toast.dismiss(toastId);

    if (response?.data?.success) {
      toast.success(messages.success ?? "Success");
    } else {
      const rawMessage = response?.data?.error?.message;

      if (rawMessage) {
        const [code, context] = rawMessage.split(",");

        if (code === "DAILY_CAPACITY_EXCEEDED") {
          const finalMessage = `Daily capacity exceeded ${context}`;
          toast.error(finalMessage);
          return;
        }
      }

      toast.error(
        response?.data?.message ||
          response?.data?.error?.message ||
          messages.error ||
          "Something went wrong",
      );
    }
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(messages.error || "Something went wrong");
    console.error("Toast error:", error);
  }
};

export const createToastHandler =
  (messages: ToastHandlerOptions) =>
  async (_arg: any, { queryFulfilled }: { queryFulfilled: Promise<any> }) => {
    await onQueryStartedToast(messages, queryFulfilled);
  };
