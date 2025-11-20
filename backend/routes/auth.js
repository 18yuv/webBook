import express from 'express'
import passport from 'passport';
import '../utils/googleController.js'
import { authLimiter } from '../middlewares/rateLimiter.js';
import { loginValidation, logoutController, signupValidation } from '../controllers/authController.js'
import { checkverification } from '../controllers/checkVerification.js';
import { resendVerification } from '../controllers/resendVerification.js';

const authRouter = express.Router()

// Auth routes
authRouter.post('/signup', authLimiter, signupValidation);
authRouter.post('/login', authLimiter, loginValidation);
authRouter.post('/logout', logoutController)

// Email verification
authRouter.get('/verify-email/:token', checkverification);
authRouter.post('/resend-verification', authLimiter, resendVerification)

// google verification
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        setAuthCookie(res, data.token);
    }
);

export default authRouter;