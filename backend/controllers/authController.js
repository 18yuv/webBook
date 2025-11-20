import Joi from 'joi'
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js'

export async function signupValidation(req, res) {

    let { name, email, password } = req.body

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/
    const passErrMessage = {
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
    }

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const JoiSchema = Joi.object({
        name: Joi.string().required().max(100),
        email: Joi.string().required().trim().email().lowercase(),
        password: Joi.string().required().min(6).max(20).pattern(passwordPattern).messages(passErrMessage)
    })
    const { error } = JoiSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new userModel({ name, email, password })
        user.password = await bcrypt.hash(password, 10)

        await user.save()

        // verification email
        await sendVerificationEmail(user);

        res.status(201).json({ message: "signup successful", success: true })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed. Please try again.'})
    }

}

export async function loginValidation(req, res) {
    let { email, password } = req.body
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/
    const passErrMessage = {
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
    }

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const JoiSchema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().required().min(6).max(20).pattern(passwordPattern).messages(passErrMessage)
    })
    const { error } = JoiSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User does not exist, Please SignUp!' });
        }

        const isPassValid = await bcrypt.compare(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({ message: "Entered password is wrong" })
        }

        if (!user.verified) {
            return res.status(403).json({
                message: "Email is not verified",
                resend: true
            });
        }

        const payload = { id: user.id, name: user.name, email: user.email }
        const secret = process.env.JWT_SECRET
        const expiresIn = '30m'

        const token = jwt.sign(payload, secret, { expiresIn })

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            // sameSite: "None",
            path: "/",
            maxAge: 30 * 60 * 1000
        });

        res.status(201).json({ message: "Login successful", success: true })

    } catch (err) {
        return res.status(500).json({ message: 'Login failed. Please try again.', err })
    }
}

export const logoutController = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true
    });

    res.status(200).json({ message: 'Logged out successfully', success: true });
};