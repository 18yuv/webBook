import jwt from "jsonwebtoken";
import { transporter } from "./nodemailer.js";

export async function sendPasswordResetEmail(user) {
    const token = jwt.sign(
        { id: user._id, name:user.name, email: user.email },
        process.env.JWT_RESET_SECRET,
        { expiresIn: "15m" }
    );

    const verifyURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
        to: user.email,
        subject: "Reset your password",
        html: `
            <p>You requested to reset your password.</p>
            <p><a href="${verifyURL}">Click here to reset your password</a></p>
            <p>This link expires in 15 minutes.</p>
        `
    });
}