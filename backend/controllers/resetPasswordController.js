import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import userModel from "../models/user.js";

export async function resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: "New Password or token is missing" });
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/
    const passErrMessage = {
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
    }

    const JoiSchema = Joi.object({
        newPassword: Joi.string().required().min(6).max(20).pattern(passwordPattern).messages(passErrMessage)
    })

    const { error } = JoiSchema.validate({ newPassword }, { abortEarly: false })

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(d => d.message)
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

        const hashed = await bcrypt.hash(newPassword, 10);

        await userModel.findByIdAndUpdate(decoded.id, {
            password: hashed
        });

        return res.status(200).json({ message: "Password reset successfully." });

    } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token." });
    }
}