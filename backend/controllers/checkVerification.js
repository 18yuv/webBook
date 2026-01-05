import jwt from 'jsonwebtoken'
import userModel from '../models/user.js';

export async function checkverification(req, res){
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.redirect(`${process.env.CLIENT_URL}/verify-expired`);
        }

        if (user.verified) {
            return res.redirect(`${process.env.CLIENT_URL}/verify-success`);
        }

        user.verified = true;
        await user.save();

        return res.redirect(`${process.env.CLIENT_URL}/verify-success`);
        
    } catch (err) {
        return res.redirect(`${process.env.CLIENT_URL}/verify-expired`);
    }
}