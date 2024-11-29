import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS
    }
})

transporter.verify((error, sucess) => {
    if (error) {
        console.error(error)
    } else {
        console.log("mailgun is ready")
    }
})