import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{
        questionText: String,
        options: [String],
        correctOptionIndex: Number, // 0-3
        points: { type: Number, default: 10 }
    }],
    passingPercentage: { type: Number, default: 70 },
    rewardDiscount: { type: Number, default: 10 }, // % Discount if passed
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Quiz = mongoose.model("Quiz", quizSchema);