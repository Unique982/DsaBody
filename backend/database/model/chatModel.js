import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sender: { 
        type: String, 
        enum: ['user', 'ai', 'support'], 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    topic: {
        type: String,
        enum: ['general', 'login', 'course', 'payment', 'news', 'contact'],
        default: 'general'
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

export const Chat = mongoose.model("Chat", chatSchema);