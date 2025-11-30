import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"], // basic email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
  },
  {
    timestamps: true,
  }
  
);

// Create User Model
const User = mongoose.model("User", userSchema);

export default User;
