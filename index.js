import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/connection.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js"; // Un-commented
import questionRoute from "./routes/questionRoute.js";
import courseRoute from "./routes/courseRoute.js"; // New
import paymentRoute from "./routes/paymentRoute.js";
import mentorRoute from "./routes/mentorRoute.js"
import messageRoute from "./routes/messageRoute.js";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute); // Un-commented
app.use("/api/question", questionRoute);
app.use("/api/mentor",mentorRoute)
app.use("/api/message", messageRoute);


// Connect DB & Start Server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running bhayo on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB Connection Error:", err));