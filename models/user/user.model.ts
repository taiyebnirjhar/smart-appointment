import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "organization",
      required: true,
      index: true,
    },
    refreshTokens: {
      type: [
        {
          token: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const userModel = models.user || model("user", userSchema);
