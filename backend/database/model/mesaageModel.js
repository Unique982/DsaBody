import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isSolved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
