import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);


// not works good on render, using email service as an alternative for production (recommended)
// install nodemailer again
// import nodemailer from "nodemailer";
// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// other alternatives:-
// aws ses (cheapest)
// mailgun 
// sendGrid etc