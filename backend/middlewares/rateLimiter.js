import rateLimit from 'express-rate-limit';

// limiter 5 req every 10 min
export const authLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many attempts, please try again later'
});