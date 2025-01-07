const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication required", error: true });
        }
        
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(403).json({ message: "Invalid token", error: true });
            }
            req.userId = decoded?._id;
            next();
        });
    } catch (err) {
        console.error("Auth token error:", err);
        res.status(400).json({
            message: err.message || "Unexpected error",
            error: true,
            success: false
        });
    }
}


module.exports = authToken