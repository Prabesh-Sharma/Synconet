import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error)
  } else {
    console.log('gmail is ready to send emails')
  }
})

export const sendVerificationEmail = async (email, username, verificationLink) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
            <p>Hi ${username},</p>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
        `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent to:', email)
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}
