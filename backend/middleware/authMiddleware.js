import jwt from "jsonwebtoken";
import User from "../database/model/userModel.js";

// ============================
// 1. Protect Routes
// ============================
export const protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) token = req.cookies.token;
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, please login" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ============================
// 2. Role Authorization
// ============================
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} not authorized` });
    }
    next();
  };
};
