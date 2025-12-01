import jwt from "jsonwebtoken";
// Note: Changed to default import 'User' in case your model exports it that way
import User from "../database/model/userModel.js"; 

// ==========================================
// 1. AUTHENTICATION PROTECTION
// Checks if a valid token exists and populates req.user
// ==========================================
export const protect = async (req, res, next) => {
    let token;

    // 1. Check token in Cookies (from login)
    if (req.cookies.token) {
        token = req.cookies.token;
    } 
    // 2. Check token in Headers (as a backup/alternative)
    else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, please login" });
    }

    try {
        // Verify the token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        
        // Find the user by the ID stored in the token payload
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) return res.status(401).json({ message: "User not found" });
        
        next();
    } catch (error) {
        // This handles expired or invalid tokens
        res.status(401).json({ message: "Token failed or expired, please log in again" });
    }
};

// ==========================================
// 2. AUTHORIZATION CHECK (Role-Based Access Control)
// Checks if req.user.role is included in the allowed roles
// ==========================================
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. Role ${req.user.role} is not authorized to access this resource.` 
            });
        }
        next();
    };
};