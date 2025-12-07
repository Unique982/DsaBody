import User from "../database/model/userModel.js";
import { Course } from "../database/model/courseModel.js";
import { Payment } from "../database/model/paymentModel.js";

// ============================
// 1. DASHBOARD STATS
// ============================
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMentors = await User.countDocuments({ role: "mentor" });
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalCourses = await Course.countDocuments();

    const revenueData = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Fetch student progress summary
    const students = await User.find({ role: "student" }).select(
      "firstname lastname progressSummary isPremium"
    );

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalMentors,
        totalStudents,
        totalCourses,
        revenue: revenueData[0]?.total || 0,
        students,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================
// 2. GET ALL USERS
// ============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================
// 3. UPDATE USER ROLE
// ============================
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Update Role Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
