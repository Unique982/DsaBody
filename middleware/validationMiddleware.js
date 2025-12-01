import { body, validationResult } from "express-validator";

// Helper to check validation results
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

// Validation Rules
export const authValidation = {
    signup: [
        body("fullname").trim().notEmpty().withMessage("Full Name is required"),
        body("email").isEmail().withMessage("Please include a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars")
    ],
    login: [
        body("email").isEmail().withMessage("Please include a valid email"),
        body("password").exists().withMessage("Password is required")
    ]
};

export const questionValidation = {
    create: [
        body("title").notEmpty().withMessage("Title is required"),
        body("difficulty").isIn(["Easy", "Medium", "Hard"]).withMessage("Invalid difficulty"),
        body("tags").isArray().withMessage("Tags must be an array")
    ]
};