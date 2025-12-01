import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 30 }, // Minutes
    joinUrl: { type: String }, // Generated after approval
    notes: String
}, { timestamps: true });

export const Mentor = mongoose.model("Mentor", sessionSchema);