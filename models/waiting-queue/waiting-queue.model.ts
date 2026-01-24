import { WAITING_QUEUE_STATUS } from "@/constant/waiting-queue-status";
import mongoose, { Schema } from "mongoose";

const waitingQueueSchema = new Schema(
  {
    customerName: { type: String, required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: WAITING_QUEUE_STATUS, default: "QUEUED" },
    orgId: { type: Schema.Types.ObjectId, required: true, index: true },
  },
  { timestamps: true },
);

export const waitingQueueModel =
  mongoose.models.waitingQueue ||
  mongoose.model("waitingQueue", waitingQueueSchema);
