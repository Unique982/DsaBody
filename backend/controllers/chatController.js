import { Chat } from "../database/model/chatModel.js";

// Get Chat History for a specific user
export const getChatHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ timestamp: 1 });
        
        res.status(200).json({
            success: true,
            chats
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching chat history" });
    }
};

// Clear Chat History
export const clearChat = async (req, res) => {
    try {
        await Chat.deleteMany({ userId: req.user._id });
        res.status(200).json({ success: true, message: "Chat history cleared" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing chat" });
    }
};