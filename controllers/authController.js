import User from "../database/model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library"; // Import Google Library

// Initialize Google Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ==========================================
// 1. REGISTER / SIGNUP
// ==========================================
export const signup = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (fullname, email, password) are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === "mentor" ? "mentor" : "student";

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role: userRole,
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
      .json({
        success: true,
        message: "Account created successfully!",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPremium: user.isPremium,
        },
      });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server Error during Signup" });
  }
};

// ==========================================
// 2. LOGIN
// ==========================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

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
        message: `Welcome back, ${user.fullname}!`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPremium: user.isPremium,
          walletBalance: user.walletBalance || 0,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error during Login" });
  }
};

// ==========================================
// 3. GOOGLE LOGIN (New Feature)
// ==========================================
export const googleLogin = async (req, res) => {
  try {
    // The frontend sends the 'credential' (ID Token) from Google
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ success: false, message: "Google credential missing" });
    }

    // Verify the Token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID, // Add this to your .env
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user (Auto-Signup)
      // Since password is required, we generate a secure random password
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        fullname: name,
        email,
        password: hashedPassword,
        avatar: picture,
        role: "student", // Default role for Google Login
      });
    }

    // Generate Token and Log them in
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
        message: `Welcome via Google, ${user.fullname}!`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          avatar: user.avatar || picture,
          isPremium: user.isPremium,
          walletBalance: user.walletBalance || 0,
        },
      });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ success: false, message: "Google Login Failed" });
  }
};

// ==========================================
// 4. LOGOUT
// ==========================================
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ success: false, message: "Server Error during Logout" });
  }
};

// ==========================================
// 5. GET CURRENT USER (ME)
// ==========================================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({ success: false, message: "Server Error fetching profile" });
  }
};

// ==========================================
// 6. BUY MEMBERSHIP
// ==========================================
export const buyMembership = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.isPremium) return res.status(400).json({ success: false, message: "Already Premium" });

    user.isPremium = true;
    user.membershipExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Membership upgraded successfully!",
      user: { fullname: user.fullname, isPremium: user.isPremium }
    });
  } catch (error) {
    console.error("Membership Upgrade Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};