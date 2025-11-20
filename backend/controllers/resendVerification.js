import userModel from "../models/user.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export async function resendVerification(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        await sendVerificationEmail(user);

        return res.status(200).json({
            message: "Verification email resent successfully."
        });

    } catch (err) {
        return res.status(500).json({ message: "Could not resend verification email", err });
    }
}