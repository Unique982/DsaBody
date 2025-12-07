// models/paymentModel.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "NPR",
    },

    provider: {
      type: String,
      enum: ["stripe", "khalti"],
      required: true,
    },

    providerPaymentId: {
      type: String, // pidx (Khalti) or paymentIntentId (Stripe)
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    type: {
      type: String,
      enum: ["membership", "course"],
      required: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId, // courseId or membershipId
      required: true,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
