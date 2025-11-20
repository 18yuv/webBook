import jwt from "jsonwebtoken";
import { transporter } from "./nodemailer.js";

export async function sendVerificationEmail(user) {
    const token = jwt.sign(
        { id: user._id, name:user.name, email: user.email },
        process.env.EMAIL_VERIFY_SECRET,
        { expiresIn: "30m" }
    );

    const verifyURL = `${process.env.CLIENT_URL}/auth/verify-email/${token}`;

    await transporter.sendMail({
        from: `"WebBook" <${process.env.EMAIL_USER}>`,
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
