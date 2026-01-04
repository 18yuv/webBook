import jwt from "jsonwebtoken";
import { resend } from "./mailService.js";

export async function sendVerificationEmail(user) {
    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.EMAIL_VERIFY_SECRET,
        { expiresIn: "1h" }
    );
    
    const verifyURL = `${process.env.API_URL}/auth/verify-email/${token}`;
    
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Verify Your Email",
            html: `
            <h2>Welcome, ${user.name}!</h2>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verifyURL}">Verify Email</a>
            <p>This link expires in 30 mins.</p>
            `
        });
    }
    catch (err) {
        console.error('Failed to send email to', user.email, ':', err);
        throw err;
    }
}