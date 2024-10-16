const nodemailer = require('nodemailer');

exports.sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: "dhruvilmody98@gmail.com",
            pass: "ozrckpzrlkrqfybo",
        },
    });

    await transporter.sendMail({
        from: 'dhruvilmody98@gmail.com',
        to,
        subject,
        text,
    });
};
