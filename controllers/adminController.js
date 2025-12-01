import User from "../database/model/userModel.js"; // Assuming export default User
import { Payment } from "../database/model/paymentModel.js"; // Assuming named export
import { Course } from "../database/model/courseModel.js"; // Assuming named export
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to generate Token (Used for Admin Login/Registration)
const generateToken = (id) => {
    // Uses the central JWT_SECRET defined in .env
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// =============================
// 1. REGISTER ADMIN
// =============================
export const registerAdmin = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role: "admin", // Explicitly set role
            isPremium: true
        });

        const token = generateToken(user._id);

        // Send Response with HTTP-only Cookie
        res.status(201)
           .cookie("token", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
               maxAge: 30 * 24 * 60 * 60 * 1000
           })
           .json({
               success: true,
               message: "Admin registered successfully",
               user: {
                   _id: user._id,
                   email: user.email,
                   role: user.role
               }
           });
    } catch (error) {
        console.error("Register Admin Error:", error);
        res.status(500).json({ message: "Server error during admin registration" });
    }
};

// =============================
// 2. LOGIN ADMIN
// =============================
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Check user existence and Role
        if (!user || user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        // Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
               maxAge: 30 * 24 * 60 * 60 * 1000
           })
           .json({
               success: true,
               message: "Admin logged in successfully",
               user: {
                   _id: user._id,
                   email: user.email,
                   role: user.role
               }
           });
    } catch (error) {
        console.error("Login Admin Error:", error);
        res.status(500).json({ message: "Server error during admin login" });
    }
};

// =============================
// 3. LOGOUT ADMIN
// =============================
export const logoutAdmin = async (req, res) => {
    try {
        res
          .status(200)
          .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0), // Clear the cookie immediately
          })
          .json({
            success: true,
            message: "Admin logged out successfully",
          });
    } catch (error) {
        console.error("Logout Admin Error:", error);
        res.status(500).json({ success: false, message: "Server Error during Logout" });
    }
};

// =============================
// 4. DASHBOARD STATS (Existing Logic)
// =============================
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        
        const revenueData = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalCourses,
                revenue: revenueData[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =============================
// 5. GET ALL USERS (Existing Logic)
// =============================
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =============================
// 6. UPDATE USER ROLE (Existing Logic)
// =============================
export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { role: req.body.role }, 
            { new: true }
        ).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};