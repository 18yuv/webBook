import jwt from 'jsonwebtoken'

async function ensureAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: "No Jwt token found" })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again.' });
        }
        res.status(401).json({ message: 'Invalid token' });
    }

}

export default ensureAuth;