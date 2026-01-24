import { SERVICE_DURATIONS } from "@/constant/service-duration.constant";
import mongoose, { models, Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      enum: SERVICE_DURATIONS,
    },
    requiredStaffType: {
      type: String,
      required: true,
    },
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const serviceModel =
  models.service || mongoose.model("service", serviceSchema);
