import express from "express";
import { exec } from "child_process";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Execute code safely
router.post("/run-code", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language required" });
  }

  try {
    let command = "";

    if (language === "javascript") {
      command = `node -e "${code.replace(/"/g, '\\"')}"`;
    } else if (language === "python") {
      command = `python -c "${code.replace(/"/g, '\\"')}"`;
    } else if (language === "c") {
      command = `echo '${code}' > temp.c && gcc temp.c -o temp && ./temp`;
    } else if (language === "cpp") {
      command = `echo '${code}' > temp.cpp && g++ temp.cpp -o temp && ./temp`;
    } else if (language === "java") {
      command = `echo '${code}' > Main.java && javac Main.java && java Main`;
    } else {
      return res.status(400).json({ error: "Unsupported language" });
    }

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) return res.json({ output: stderr || error.message });
      res.json({ output: stdout });
    });
  } catch (err) {
    res.status(500).json({ output: err.message });
  }
});

// AI Suggestion
router.post("/ai-suggestion", async (req, res) => {
  const { question, code, language } = req.body;
  try {
    const prompt = `
You are an expert programmer.
The user asked: "${question}".
The user wrote this ${language} code:
${code || "// no code yet"}

Check the code and provide a corrected / improved version if needed.
Return only the suggestion and a short explanation.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const suggestion = completion.choices[0].message?.content || "";
    res.json({ suggestion });
  } catch (err) {
    res.status(500).json({ suggestion: "AI Suggestion failed" });
  }
});

export default router;
