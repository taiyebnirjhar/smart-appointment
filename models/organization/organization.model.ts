import { model, models, Schema } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent model overwrite in dev (Next.js)

// ** “If a model named organization already exists, reuse it.
// ** Otherwise, create it using the schema.”

export const organizationModel =
  models.organization || model("organization", organizationSchema);
