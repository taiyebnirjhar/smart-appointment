import { WAITING_QUEUE_STATUS } from "@/constant/waiting-queue-status";
import "@/models/service/service.model";
import mongoose, { Schema } from "mongoose";

export const waitingQueueSchema = new Schema(
  {
    customerName: { type: String, required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "service", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: WAITING_QUEUE_STATUS, default: "QUEUED" },
    orgId: { type: Schema.Types.ObjectId, required: true, index: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

waitingQueueSchema.virtual("service", {
  ref: "service",
  localField: "serviceId",
  foreignField: "_id",
  justOne: true,
});

export const waitingQueueModel =
  mongoose.models.waitingQueue ||
  mongoose.model("waitingQueue", waitingQueueSchema);
