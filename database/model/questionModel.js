import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    tags: [String],
    
    // Detailed fields for practice
    constraints: [String], // e.g. "1 <= N <= 10^5"
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
    
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' }
}, { timestamps: true });

export const Question = mongoose.model("Question", questionSchema);