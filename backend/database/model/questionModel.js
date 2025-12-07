import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },

  tags: [String],

  constraints: [String],

  examples: [{
    input: String,
    output: String,
    explanation: String
  }],

  testCases: [{
    input: String,
    output: String,
    isHidden: { type: Boolean, default: true }
  }],

  // 🌟 Recommended
  starterCode: {
    type: Map,
    of: String
  },

  points: {
    type: Number,
    default: 10
  },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published"
  },

  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  }

}, { timestamps: true });

export const Question = mongoose.model("Question", questionSchema);
