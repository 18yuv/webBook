import express from 'express'
import passport from 'passport';
import { setAuthCookie } from '../middlewares/cookie.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { loginValidation, logoutController, signupValidation } from '../controllers/authController.js';
import { checkverification } from '../controllers/checkVerification.js';
import { resendVerification } from '../controllers/resendVerification.js';
import ensureAuth from '../middlewares/ensureAuth.js';
import { setPassword } from '../controllers/setPassword.js';
import { requestPasswordReset } from '../controllers/requestPasswordReset.js';
import { resetPassword } from '../controllers/resetPasswordController.js';

const authRouter = express.Router();

// Auth routes
authRouter.post('/signup', authLimiter, signupValidation);
authRouter.post('/login', authLimiter, loginValidation);
authRouter.post('/logout', logoutController);

// Email verification
authRouter.get('/verify-email/:token', checkverification);
authRouter.post('/resend-verification', authLimiter, resendVerification);

// reset password
authRouter.post('/request-password-reset', authLimiter, requestPasswordReset);
authRouter.post('/reset-password', authLimiter, resetPassword);

// google verification
authRouter.post("/set-password", authLimiter, ensureAuth, setPassword);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        setAuthCookie(res, req.user.token);
        return res.status(201).json({ message: "Login successful", success: true })
    }
);

export default authRouter;