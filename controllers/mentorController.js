import { Mentor} from "../database/model/mentorModel.js";
import  User  from "../database/model/userModel.js";

// Student requests a session
export const requestSession = async (req, res) => {
    try {
        const { mentorId, scheduledAt, notes } = req.body;
        
        const mentor = await User.findById(mentorId);
        if (!mentor || mentor.role !== 'mentor') {
            return res.status(404).json({ message: "Mentor not found" });
        }

        const session = await MentorSession.create({
            mentor: mentorId,
            student: req.user._id,
            scheduledAt,
            notes
        });

        res.status(201).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mentor approves session
export const approveSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await MentorSession.findById(sessionId);

        if (!session) return res.status(404).json({ message: "Session not found" });
        
        // Ensure logged in user is the mentor for this session
        if (session.mentor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        session.status = 'approved';
        session.joinUrl = `https://dsa-sathi.com/call/${sessionId}`; // Mock URL
        await session.save();

        res.json({ success: true, session });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};