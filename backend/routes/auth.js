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
// authRouter.post('/signup', authLimiter, signupValidation);
// authRouter.post('/login', authLimiter, loginValidation);

authRouter.post('/signup', signupValidation);
authRouter.post('/login', loginValidation);
authRouter.post('/logout', logoutController);

// Email verification
authRouter.post('/resend-verification', authLimiter, resendVerification);
authRouter.get('/verify-email/:token', checkverification);

// reset password
authRouter.post('/request-password-reset', authLimiter, requestPasswordReset);
authRouter.post('/reset-password/:token', authLimiter, resetPassword);

// google verification
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        setAuthCookie(res, req.user.token);
        res.redirect("http://localhost:5173/dashboard");
    }
);
authRouter.post("/set-password", authLimiter, ensureAuth, setPassword);

export default authRouter;