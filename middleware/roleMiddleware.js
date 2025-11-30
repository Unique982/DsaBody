// Middleware to restrict access based on user roles
const checkRole = (role) => (req, res, next) => {
    // req.user is populated by the protect middleware
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.user.role !== role) {
        return res.status(403).json({ 
            message: `Not authorized. Required role: ${role}` 
        });
    }

    next();
};

module.exports = { checkRole };