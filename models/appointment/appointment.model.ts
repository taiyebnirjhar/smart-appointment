import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"],
      default: "SCHEDULED",
    },
    orgId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);
