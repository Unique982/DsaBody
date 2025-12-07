export const checkRole = (role) => (req, res, next) => {
    // req.user is populated by the protect middleware
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.user.role !== role) {
        return res.status(403).json({ 
            message: `Access denied. Required role: ${role}` 
        });
    }

    next();
};