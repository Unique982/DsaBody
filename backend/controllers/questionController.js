import { Question } from "../database/model/questionModel.js";

// ==================================================
// 1. ADD QUESTION  (Admin / Mentor Only)
// ==================================================
export const addQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      constraints,
      examples,
      testCases,
      starterCode,
      points,
      status,
      visibility
    } = req.body;

    if (!title || !description || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Title, Description & Difficulty are required"
      });
    }

    const question = await Question.create({
      title,
      description,
      difficulty,
      tags: tags || [],
      constraints: constraints || [],
      examples: examples || [],
      testCases: testCases || [],
      starterCode: starterCode || {},
      points: points || 10,
      status: status || "published",
      visibility: visibility || "public",
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully ✅",
      question
    });

  } catch (error) {
    console.error("Add Question Error:", error);
    res.status(500).json({ success:false, message: error.message });
  }
};

// ==================================================
// 2. GET ALL QUESTIONS (filter by difficulty/tags)
// ==================================================
export const getQuestions = async (req, res) => {
  try {
    const { difficulty, tags, status } = req.query;

    const query = { visibility: "public" };

    if (difficulty) query.difficulty = difficulty;
    if (status) query.status = status;
    if (tags) query.tags = { $in: tags.split(",") };

    const questions = await Question.find(query)
      .select("-testCases")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions
    });

  } catch (error) {
    console.error("Get Questions Error:", error);
    res.status(500).json({ success:false, message: error.message });
  }
};

// ==================================================
// 3. GET SINGLE QUESTION (For Practice Page)
// ==================================================
export const getSingleQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).select("-testCases.output");

    if (!question) {
      return res.status(404).json({ success:false, message: "Question not found" });
    }

    res.status(200).json({ success:true, question });

  } catch (error) {
    console.error("Get Single Question Error:", error);
    res.status(500).json({ success:false, message: error.message });
  }
};

// ==================================================
// 4. SUBMIT PRACTICE CODE
// ==================================================
export const submitPractice = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code & language are required"
      });
    }

    // demo mode
    if (!req.user && req.query.demo === "true") {
      return res.status(200).json({
        success: true,
        status: "Accepted ✅",
        message: "Demo Mode: 3/3 test cases passed"
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Login required to submit full solution"
      });
    }

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ success:false, message: "Question not found" });
    }

    // ⚠ MOCK result for now (Replace later with Judge0 / Docker API)
    const isCorrect = Math.random() > 0.3;

    res.json({
      success: true,
      status: isCorrect ? "Accepted ✅" : "Wrong Answer ❌",
      totalTestCases: question.testCases.length,
      passed: isCorrect ? question.testCases.length : Math.floor(question.testCases.length / 2),
      pointsEarned: isCorrect ? question.points : 0
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ success:false, message: error.message });
  }
};

// ==================================================
// 5. UPDATE QUESTION (Admin/Mentor)
// ==================================================
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ success:false, message: "Question not found" });
    }

    res.json({
      success: true,
      message: "Question updated ✅",
      updatedQuestion
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success:false, message: error.message });
  }
};

// ==================================================
// 6. DELETE QUESTION (Admin Only)
// ==================================================
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ success:false, message: "Question not found" });
    }

    res.json({
      success: true,
      message: "Question deleted successfully 🗑️"
    });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success:false, message: error.message });
  }
};
