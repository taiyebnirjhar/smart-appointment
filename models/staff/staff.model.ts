import { STAFF_AVAILABILITY } from "@/constant/staff-availability.constant";
import { STAFF_TYPE_VALUES } from "@/constant/staff-types.constant";
import { model, models, Schema } from "mongoose";

const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    staffType: {
      type: String,
      enum: STAFF_TYPE_VALUES,
      required: true,
    },
    dailyCapacity: {
      type: Number,
      required: true,
      default: 5,
      min: 1,
    },
    availabilityStatus: {
      type: String,
      enum: STAFF_AVAILABILITY,
      default: "AVAILABLE",
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

export const staffModel = models.staff || model("staff", staffSchema);
