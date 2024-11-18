const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ msg: 'Authorization denied: No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Authorization denied: Invalid token' });
    }
}

module.exports = fetchuser;
