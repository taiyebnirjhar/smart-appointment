import { WaitingQueueStatus } from "@/types/api-response/api-response";

export const WAITING_QUEUE_STATUS = ["QUEUED", "ASSIGNED"] as const;

export const WAITING_QUEUE_STATUS_LABEL: Record<WaitingQueueStatus, string> = {
  QUEUED: "Queued",
  ASSIGNED: "Assigned",
};
