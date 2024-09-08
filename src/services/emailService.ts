import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arziblack2@gmail.com",
    pass: "lcorpzrhxidygyqu", 
  },
});

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (mailOptions: MailOptions) => {
  const mail = {
    from: "arziblack2@gmail.com",
    to: mailOptions.to,
    subject: mailOptions.subject,
    html: mailOptions.html,
  };

  try {
    await transporter.sendMail(mail);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
