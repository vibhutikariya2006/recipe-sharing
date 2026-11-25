
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        // First check cookie
        let token = req.cookies?.token;
console.log("Cookies:", req.cookies);
console.log("Token:", req.cookies?.token);
        // If cookie is not available, check Authorization header
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Check whether token exists
        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find logged-in user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Authentication Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
