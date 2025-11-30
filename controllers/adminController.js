import User from "../Database/models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/authMiddleware.js";

// =============================
// REGISTER ADMIN
// =============================
export const registerAdmin = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists (user/admin)." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin registered successfully",
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during admin registration" });
  }
};

// =============================
// LOGIN ADMIN
// =============================
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Admin logged in successfully",
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during admin login" });
  }
};

// =============================
// GET ALL USERS (Admin Only)
// =============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching users" });
  }
};
