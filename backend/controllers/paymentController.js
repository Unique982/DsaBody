import { Payment } from "../database/model/paymentModel.js";
import User from "../database/model/userModel.js";
import { Course } from "../database/model/courseModel.js";
import Stripe from "stripe";

// Initialize Stripe (add your secret key in .env)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ============================================================================
   INITIATE KHALTI PAYMENT
============================================================================ */
export const initiateKhalti = async (req, res) => {
  try {
    const { amount, courseId } = req.body;

    if (!amount || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Amount and courseId are required",
      });
    }

    // Create payment record
    const payment = await Payment.create({
      user: req.user._id,
      amount,
      provider: "khalti",
      type: "course",
      targetId: courseId,
      status: "pending",
    });

    return res.json({
      success: true,
      pidx: payment._id,
      payment_url: "https://test-pay.khalti.com/?pidx=mock_pidx_123",
    });
  } catch (error) {
    console.error("Initiate Khalti Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================================
   VERIFY KHALTI PAYMENT
============================================================================ */
export const verifyKhalti = async (req, res) => {
  try {
    const { pidx } = req.body;

    if (!pidx) {
      return res.status(400).json({
        success: false,
        message: "pidx is required",
      });
    }

    const payment = await Payment.findById(pidx);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed",
      });
    }

    // Mark payment completed (mock verification)
    payment.status = "completed";
    payment.providerPaymentId = pidx;
    await payment.save();

    // Add course to user
    await User.findByIdAndUpdate(payment.user, {
      $addToSet: { purchasedCourses: payment.targetId },
    });

    return res.json({
      success: true,
      message: "Khalti payment verified",
    });
  } catch (error) {
    console.error("Verify Khalti Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================================
   INITIATE STRIPE PAYMENT
============================================================================ */
export const initiateStripe = async (req, res) => {
  try {
    const { amount, courseId } = req.body;

    if (!amount || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Amount and courseId are required",
      });
    }

    const payment = await Payment.create({
      user: req.user._id,
      amount,
      provider: "stripe",
      type: "course",
      targetId: courseId,
      status: "pending",
    });

    return res.json({
      success: true,
      paymentId: payment._id,
      payment_url: "https://stripe.com/mock_payment_intent_url",
    });
  } catch (error) {
    console.error("Initiate Stripe Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================================
   VERIFY STRIPE PAYMENT
============================================================================ */
export const verifyStripe = async (req, res) => {
  try {
    const { paymentId, paymentIntentId } = req.body;

    if (!paymentId || !paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "paymentId and paymentIntentId are required",
      });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed",
      });
    }

    // (Mock stripe verify)
    payment.status = "completed";
    payment.providerPaymentId = paymentIntentId;
    await payment.save();

    await User.findByIdAndUpdate(payment.user, {
      $addToSet: { purchasedCourses: payment.targetId },
    });

    return res.json({
      success: true,
      message: "Stripe payment verified",
    });
  } catch (error) {
    console.error("Verify Stripe Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================================
   GET MY PAYMENTS
============================================================================ */
export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate(
      "targetId",
      "title price"
    );

    return res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Get My Payments Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================================
   ADMIN – GET ALL PAYMENTS
============================================================================ */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "firstname lastname email")
      .populate("targetId", "title price");

    return res.json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Get All Payments Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
