import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const activityLogModel =
  mongoose.models.activityLog ||
  mongoose.model("activityLog", activityLogSchema);
