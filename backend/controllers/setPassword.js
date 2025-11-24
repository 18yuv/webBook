import Joi from 'joi';
import bcrypt from "bcrypt";
import userModel from "../models/user.js";

export async function setPassword(req, res) {
    const { newPassword } = req.body;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/
    const passErrMessage = {
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
    }

    if (!newPassword) {
        return res.status(400).json({ message: "New Password is required" });
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
        const hashed = await bcrypt.hash(newPassword, 10);

        await userModel.findByIdAndUpdate(req.user.id, {
            password: hashed
        });

        return res.status(200).json({ message: "Password set successfully." });
    }
    catch (err) {
        return res.status(500).json({ message: 'Error setting password' });
    }
}