import User from "../database/model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ============================
// 1. REGISTER (Student / Mentor / Admin)
// ============================
export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole =
      role === "admin" ? "admin" : role === "mentor" ? "mentor" : "student";

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "student",
      isPremium: userRole === "admin" ? true : false, // Admins are always premium
    });

    const token = generateToken(user._id);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "Account created successfully", user });
  } catch (error) {
    console.error("Register Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// ============================
// 2. LOGIN
// ============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and Password are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back, ${user.firstname}!`,
        user,
      });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// ============================
// 3. LOGOUT
// ============================
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { httpOnly: true, expires: new Date(0) })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during logout" });
  }
};

// ============================
// 4. GET CURRENT USER
// ============================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetMe Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching profile" });
  }
};

// ============================
// 5. BUY MEMBERSHIP
// ============================
export const buyMembership = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.isPremium)
      return res
        .status(400)
        .json({ success: false, message: "Already Premium" });

    user.isPremium = true;
    user.membershipExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Membership upgraded successfully",
        user,
      });
  } catch (error) {
    console.error("Membership Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error during membership upgrade",
      });
  }
};
