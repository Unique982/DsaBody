import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true }, // 0 for free
    thumbnail: String,
    tags: [String],
    isPublished: { type: Boolean, default: false },
    lessons: [{
        title: String,
        videoUrl: String,
        content: String,
        isFree: { type: Boolean, default: false } // For preview
    }]
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);