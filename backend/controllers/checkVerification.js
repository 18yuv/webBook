import jwt from 'jsonwebtoken'
import userModel from '../models/user.js';

export async function checkverification(req, res){
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid verification link" });
        }

        if (user.verified) {
            return res.status(200).json({ message: "Email already verified" });
        }

        user.verified = true;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (err) {
        res.status(400).json({ message: "Invalid or Expired Link" });
    }
}