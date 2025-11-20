import express from 'express'
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

export default authRouter;