import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

/**
 * Sends an email using SMTP (Gmail in this case)
 * @param {Object} options - Email sending options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Subject line
 * @param {string} options.text - Plain text body
 * @param {string} [options.html] - Optional HTML body
 */
const sendEmail = async ({ to, subject, text}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"StayAtlas" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email sending error:", error);
        throw new ApiError(500,"Failed to send email");
    }
};

export default sendEmail;
