import nodemailer from 'nodemailer'; // Import Nodemailer
import dotenv from 'dotenv'; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from .env file

export const sendEmail = async (req, res) => {
  // Connect with Gmail

    const {senderemail,subject}=req.body;

  const transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com', // Use Gmail SMTP server
    port: 587,
    secure: false, // Use `true` for port 465, `false` for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    // Send email
    const info = await transporter.sendMail({
      from: `"Node Mailer Buddy 👻" <${senderemail}>`,
      to: senderemail,
      subject: subject,
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    });

    console.log('Message sent: %s', info.messageId);
    res.json(info);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
