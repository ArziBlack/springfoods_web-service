import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { magenta, red } from "colors";

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
    console.log(magenta("Email sent successfully"));
  } catch (error) {
    console.log(red("Failed to send email"));
    throw new Error("Failed to send email");
  }
};
