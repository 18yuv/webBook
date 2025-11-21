import userModel from "../models/user.js";
import { sendPasswordResetEmail } from "../utils/resetPasswordEmail.js";

export async function requestPasswordReset(req, res) {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        await sendPasswordResetEmail(user);

        res.json({ message: "Password reset email sent." });
    }
    catch (err) {
        return res.status(500).json({ message: 'Error sending reset email' });
    }
}
