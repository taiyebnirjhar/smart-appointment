import "@/models/organization/organization.model";
import "@/models/service/service.model";
import "@/models/staff/staff.model";
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
      ref: "service",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "staff",
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
      ref: "organization",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

appointmentSchema.virtual("service", {
  ref: "service",
  localField: "serviceId",
  foreignField: "_id",
  justOne: true,
});

appointmentSchema.virtual("staff", {
  ref: "staff",
  localField: "staffId",
  foreignField: "_id",
  justOne: true,
});

export const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);
