import mongoose from "mongoose";

/* ================= SUB SCHEMAS ================= */

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { _id: false }
);

const progressSummarySchema = new mongoose.Schema(
  {
    questionsSolved: { type: Number, default: 0, min: 0 },
    streakDays: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const mentorProfileSchema = new mongoose.Schema(
  {
    specialties: [{ type: String, trim: true }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [reviewSchema],
    isApproved: { type: Boolean, default: false },
  },
  { _id: false }
);

/* ================= MAIN SCHEMA ================= */

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide password from queries
    },

    phone: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
      index: true,
    },

    /* ---- Membership ---- */

    isPremium: {
      type: Boolean,
      default: false,
    },

    membershipExpiresAt: {
      type: Date,
    },

    walletBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    /* ---- Student ---- */

    skills: [{ type: String, trim: true }],

    progressSummary: progressSummarySchema,

    /* ---- Mentor ---- */

    mentorProfile: mentorProfileSchema,
  },
  { timestamps: true }
);

/* ================= INDEX ================= */

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

/* ================= EXPORT ================= */


// Create User Model
const User = mongoose.model("User", userSchema);
export default User;
