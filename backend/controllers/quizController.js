import { Quiz } from "../database/model/quizModel.js";
import User from "../database/model/userModel.js";

export const createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create({ ...req.body, createdBy: req.user._id });
        res.status(201).json({ success: true, quiz });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).select("-questions.correctOptionIndex");
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.json({ success: true, quiz });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body; // Array of indices [0, 2, 1...]
        const quiz = await Quiz.findById(req.params.id);
        
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;
        let totalPoints = 0;

        quiz.questions.forEach((q, index) => {
            totalPoints += q.points;
            if (answers[index] === q.correctOptionIndex) {
                score += q.points;
            }
        });

        const percentage = (score / totalPoints) * 100;
        let discountCode = null;

        if (percentage >= quiz.passingPercentage) {
            discountCode = `DISCOUNT-${Date.now()}`;
            // Save discount logic to user profile (Mocked here)
            await User.findByIdAndUpdate(req.user._id, {
                $push: { skills: `Passed Quiz: ${quiz.title}` }
            });
        }

        res.json({
            success: true,
            score,
            totalPoints,
            percentage,
            passed: percentage >= quiz.passingPercentage,
            discountCode
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};