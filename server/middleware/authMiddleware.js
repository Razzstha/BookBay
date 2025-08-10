
import jwt from 'jsonwebtoken';

// Middleware to verify token and extract user info
export const protect = (req, res, next) => {
    let token;

    // Get token from Authorization header (format: "Bearer <token>")
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, unauthorized
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    try {
        // Verify token using secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save decoded user info (id, name) to req.user for later use
        req.user = decoded; // <-- id and name available here

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};

// Middleware to restrict access to admins only (check name === 'admin')
export const adminOnly = (req, res, next) => {
    // Check if user info exists and name is admin (case-sensitive)
    if (req.user && req.user.name === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
};
