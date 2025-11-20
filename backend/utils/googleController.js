import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/user.js';
import jwt from 'jsonwebtoken';

passport.use(new GoogleStrategy({
    clientID: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {

            let user = await userModel.findOne({ email: profile.emails[0].value });

            if (!user) {
                user = new userModel({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: null,
                    verified: true
                });
                await user.save();
            }
            
            const payload = { id: user.id, name: user.name, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });

            done(null, { user, token });
        } catch (err) {
            done(err, null);
        }
    }
));