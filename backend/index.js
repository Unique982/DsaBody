import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/connection.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js"; // Un-commented
import questionRoute from "./routes/questionRoute.js";
import courseRoute from "./routes/courseRoute.js"; // New
import paymentRoute from "./routes/paymentRoute.js";
import mentorRoute from "./routes/mentorRoute.js";
import messageRoute from "./routes/messageRoute.js";
import quizRoute from "./routes/quizRoute.js";
import chatRoute from "./routes/chatRoute.js";
import { Chat } from "./database/model/chatModel.js";
import { getAIResponse } from "./utils/aiServices.js";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/question", questionRoute);
app.use("/api/mentor", mentorRoute);
app.use("/api/message", messageRoute);
app.use("/api/course", courseRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/chat", chatRoute);
app.post("/api/ai-suggestion", async (req, res) => {
  const { question, language } = req.body;

  try {
    const prompt = `
You are an AI coding assistant.
User asked: "${question}" in ${language}.
Please write a correct ${language} code solution for this task.
Provide ONLY the code, no extra explanation.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const suggestion = response.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ suggestion: "// AI Suggestion failed" });
  }
});

// ===== Run Code Endpoint =====
app.post("/api/run-code", async (req, res) => {
  const { code, language } = req.body;

  try {
    if (language === "javascript") {
      const func = new Function(code + "\nreturn 'JS executed ✅';");
      const output = func();
      return res.json({ output });
    } else if (language === "python") {
      const tmpFile = "tmp_code.py";
      fs.writeFileSync(tmpFile, code);

      exec(`python ${tmpFile}`, (err, stdout, stderr) => {
        if (err) return res.json({ output: stderr || err.message });
        return res.json({ output: stdout });
      });
    } else {
      return res.json({ output: "Language not supported yet" });
    }
  } catch (err) {
    return res.json({ output: err.message });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
