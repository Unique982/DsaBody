import { Question } from "../database/model/questionModel.js";

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    return res.status(200).json({
      questions,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { question, description, difficulty } = req.body;

    if (!question || !description || !difficulty) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    await Question.create({
      question,
      description,
      difficulty,
    });

    return res.status(200).json({
      message: "Question added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
