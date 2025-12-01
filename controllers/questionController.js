import { Question } from "../database/model/questionModel.js";

// ==========================================
// 1. CREATE QUESTION (Used by Admin/Mentor)
// ==========================================
export const addQuestion = async (req, res) => {
    try {
        // We now require the full set of fields from the enhanced Question Schema
        const { title, description, difficulty, tags, constraints, examples, testCases } = req.body;

        if (!title || !description || !difficulty) {
            return res.status(400).json({
                message: "Title, description, and difficulty are required",
                success: false,
            });
        }

        // req.user._id is populated by the 'protect' middleware
        const question = await Question.create({
            title,
            description,
            difficulty,
            tags: tags || [],
            constraints: constraints || [],
            examples: examples || [],
            testCases: testCases || [],
            author: req.user._id, 
            visibility: 'public'
        });

        return res.status(201).json({
            message: "Question added successfully!",
            success: true,
            question
        });
    } catch (error) {
        console.error("Error adding question:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// ==========================================
// 2. GET ALL QUESTIONS (Used for listing/filtering)
// Merged logic from getQuestions (Modern) and getAllQuestions (Original)
// ==========================================
export const getQuestions = async (req, res) => {
    try {
        const { difficulty, tags } = req.query;

        // Base query for filtering
        const query = {};
        if (difficulty) query.difficulty = difficulty;
        if (tags) query.tags = { $in: tags.split(',') }; // Allows filtering by multiple tags

        const questions = await Question.find(query).select('-testCases'); // Hide test cases for public list

        res.json({ 
            success: true, 
            count: questions.length, 
            questions 
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: error.message });
    }
};

// ==========================================
// 3. SUBMIT PRACTICE CODE (Mock Test Runner)
// ==========================================
export const submitPractice = async (req, res) => {
    try {
        const { code, language } = req.body;
        const { id } = req.params;
        
        // --- DEMO MODE LOGIC ---
        // If not authenticated and in demo mode, mock a successful run 
        // until the hardcoded demo limit is hit (logic simplified for brevity)
        if (!req.user && req.query.demo === 'true') {
            // Note: In a real app, track demo submissions in cookies/session
            return res.status(200).json({ 
                success: true, 
                message: "Demo submission processed (Mock Result)",
                result: "Passed 3/3 Test Cases" 
            });
        }
        
        // If user is not logged in and not in demo mode (or demo limit reached)
        if (!req.user) {
             return res.status(401).json({ 
                 success: false,
                 action: "login_required",
                 message: "Demo limit reached. Please log in for unlimited practice."
             });
        }

        // --- REAL LOGIC (Authenticated User) ---
        const question = await Question.findById(id);
        if(!question) return res.status(404).json({message: "Question not found"});

        // 1. Run Code against question.testCases (Mocking Runner here)
        // In a real app, this calls an external container/API like Sphere Engine or Judge0.
        const isSuccess = Math.random() > 0.2; // 80% chance success
        
        // 2. Track user progress (Not fully implemented here, but logic would go here)
        // E.g., await Progress.findOneAndUpdate(...)

        res.json({
            success: true,
            status: isSuccess ? "Accepted" : "Wrong Answer",
            details: isSuccess ? "All test cases passed" : "Failed on hidden test case 2"
        });

    } catch (error) {
        console.error("Error during code submission:", error);
        res.status(500).json({ message: error.message });
    }
};