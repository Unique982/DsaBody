import dotenv from "dotenv";
dotenv.config();

// MOCK AI IMPLEMENTATION (For Hackathon/Demo)
// In production, replace the fetch/axios calls with real OpenAI/Gemini API calls.

const SYSTEM_PROMPT = `
You are the AI Support Assistant for "DSA Sathi", a coding platform.
Your Role: Help students with Login, Courses, Payments, News, and Contacting Support.
Knowledge Base:
1. Login: Users need email/password. Google Login is available. If stuck, use 'Forgot Password'.
2. Courses: We offer DSA, Web Dev, and System Design. Premium members get all courses.
3. Payment: We accept Khalti (Nepal) and Stripe (International).
4. Contact: Email us at support@dsasathi.com or call +977-9800000000.
5. News: We are hosting a Hackathon this Saturday!

Constraint: Keep answers short (under 50 words) and friendly.
`;

export const getAIResponse = async (userMessage) => {
    try {
        // --- REAL AI INTEGRATION EXAMPLE (Commented Out) ---
        /*
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.AI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage }
                ]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
        */

        // --- MOCK RESPONSE LOGIC (For immediate use) ---
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes("login") || lowerMsg.includes("password")) {
            return "To login, use your email or Google. If you forgot your password, click 'Forgot Password' on the login page.";
        }
        if (lowerMsg.includes("payment") || lowerMsg.includes("khalti") || lowerMsg.includes("stripe")) {
            return "We accept payments via Khalti and Stripe. You can upgrade to Premium from your profile dashboard.";
        }
        if (lowerMsg.includes("course") || lowerMsg.includes("buy")) {
            return "Check out our 'Courses' page! We have DSA and Web Dev courses. Premium members get full access.";
        }
        if (lowerMsg.includes("contact") || lowerMsg.includes("human")) {
            return "You can reach our human team at support@dsasathi.com.";
        }
        
        // Default AI fallback
        return "I can help with Login, Courses, and Payments. What do you need help with?";

    } catch (error) {
        console.error("AI Service Error:", error);
        return "I am currently experiencing high traffic. Please try again later.";
    }
};