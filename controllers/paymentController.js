// Import models correctly
import { Payment } from "../database/model/paymentModel.js";
import User from "../database/model/userModel.js";
import { Course } from "../database/model/courseModel.js";

/**
 * =========================
 * INITIATE KHALTI PAYMENT
 * =========================
 */
export const initiateKhalti = async (req, res) => {
  try {
    const { amount, courseId } = req.body;

    if (!amount || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Amount and courseId are required",
      });
    }

    // Find user
    const user = req.user;

    // Create a pending payment record
    const payment = await Payment.create({
      user: user._id,
      course: courseId,
      amount,
      method: "khalti",
      status: "pending",
    });

    // Return a mock URL for frontend redirect
    res.json({
      success: true,
      payment_url: "https://test-pay.khalti.com/?pidx=mock_pidx_123",
      pidx: "mock_pidx_123",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =========================
 * VERIFY KHALTI PAYMENT
 * =========================
 */
export const verifyKhalti = async (req, res) => {
  try {
    const { pidx, courseId } = req.body;

    if (!pidx || !courseId) {
      return res.status(400).json({ success: false, message: "pidx and courseId required" });
    }

    // Find the payment by mock pidx
    const payment = await Payment.findOne({ _id: courseId, method: "khalti" });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment record not found" });
    }

    payment.status = "completed";
    await payment.save();

    // Add course to user's purchasedCourses
    await User.findByIdAndUpdate(payment.user, {
      $addToSet: { purchasedCourses: courseId },
    });

    res.json({ success: true, message: "Payment verified and course unlocked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =========================
 * INITIATE STRIPE PAYMENT
 * =========================
 */
export const initiateStripe = async (req, res) => {
  try {
    const { amount, courseId } = req.body;

    if (!amount || !courseId) {
      return res.status(400).json({ success: false, message: "Amount and courseId required" });
    }

    // Create pending payment record
    const payment = await Payment.create({
      user: req.user._id,
      course: courseId,
      amount,
      method: "stripe",
      status: "pending",
    });

    // Placeholder for Stripe Payment Intent URL
    res.json({
      success: true,
      payment_url: "https://stripe.com/mock_payment_intent_url",
      paymentId: payment._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =========================
 * GET USER PAYMENTS
 * =========================
 */
export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("course", "title price");

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =========================
 * GET ALL PAYMENTS (ADMIN)
 * =========================
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "fullname email")
      .populate("course", "title price");

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
