import User from "../database/model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "All Fields Required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User with email already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fields cannot be left empty!!",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const tokenData = {
      userID: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const loggedInUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isPremium: user.isPremium
    };

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}!!`,
        success: true,
        loggedInUser,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(201).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const buyMembership = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
        success: false,
      });
    }

    user.isPremium = true;
    await user.save();

    return res.status(200).json({
      message: "Membership upgraded successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error upgrading membership:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Get current user
 export const getMe = async (req, res) => {
    res.json({ id: req.user._id, fullname: req.user.fullname, email: req.user.email, role: req.user.role });
};