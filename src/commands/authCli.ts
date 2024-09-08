import { Command } from "commander";
import CryptoJS from "crypto-js";
import Table from "cli-table3";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";
import { connectDB } from "../config/db";
import { green } from "colors";
import { signin_customer } from "../controllers/auth.controller";
import { sendEmail } from "../services/emailService";

const program = new Command();

program
  .command("create-user")
  .description("Create a new user")
  .requiredOption("--first_name <first_name>", "First name of the user")
  .requiredOption("--last_name <last_name>", "Last name of the user")
  .requiredOption("--email <email>", "Email address of the user")
  .requiredOption("--phone_number <phone_number>", "Phone number of the user")
  //   .requiredOption('--date_of_birth <date_of_birth>', 'Date of birth of the user (YYYY-MM-DD)')
  .requiredOption("--password <password>", "Password for the user")
  .requiredOption(
    "--gender <gender>",
    "Gender of the user (male, female, non-binary, prefer not to say)"
  )
  .requiredOption("--role <role>", "Role of the user (user, admin, vendor)")
  .requiredOption(
    "--profile_image <profile_image>",
    "Profile image URL of the user"
  )
  .requiredOption("--zip_code <zip_code>", "ZIP code of the user")
  .requiredOption("--street <street>", "Street address of the user")
  .requiredOption("--city <city>", "City of the user")
  .requiredOption("--state <state>", "State of the user")
  .requiredOption("--country <country>", "Country of the user")
  .action(async (options) => {
    try {
      await connectDB();
      const table_1 = new Table({
        head: ["Field", "Value"],
        colWidths: [25, 50],
      });

      const contact = new Contact({
        email: options.email,
        first_name: options.first_name,
        last_name: options.last_name,
        phone_number: options.phone_number,
        zip_code: options.zip_code,
        city: options.city,
        state: options.state,
        country: options.country,
        street: options.street,
      });

      const savedContact = await contact.save();
      table_1.push(
        ["email", savedContact.email],
        ["first_name", savedContact.first_name],
        ["last_name", savedContact.last_name],
        ["phone_number", savedContact.phone_number],
        ["zip_code", savedContact.zip_code],
        ["city", savedContact.city],
        ["state", savedContact.state],
        ["country", savedContact.country],
        ["street", savedContact.street]
      );

      console.log(table_1.toString());

      const user = new User({
        contact: savedContact._id,
        role: options.role as "user" | "admin" | "vendor",
        gender: options.gender as
          | "male"
          | "female"
          | "non-binary"
          | "prefer not to say",
        email: options.email,
        password: CryptoJS.SHA256(options.password).toString(),
        isEmailVerified: options.isEmailVerified === "true",
      });

      const savedUser: any = await user.save();
      const table = new Table({
        head: ["Field", "Value"],
        colWidths: [25, 50],
      });

      const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h1 style="font-size: 24px; font-weight: bold; color: #1D4ED8;">Welcome to Spring Foods!</h1>
    <p style="font-size: 16px; color: #4B5563;">Dear ${savedContact.first_name},</p>

    <p style="font-size: 16px; color: #4B5563; line-height: 1.6;">
      We're thrilled to have you join the Spring Foods community! To get started, please verify your account by clicking the button below. Verifying your account helps us ensure the security of your information and gives you full access to our features.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://springfoods.com/verify?token=${"verificationToken"}" 
         style="background-color: #1D4ED8; color: white; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px;">
        Verify Your Account
      </a>
    </div>

    <p style="font-size: 16px; color: #4B5563; line-height: 1.6;">
      Once verified, you'll be able to enjoy all the perks of being a Spring Foods member, including personalized recommendations, special promotions, and updates on new arrivals.
    </p>

    <p style="font-size: 16px; color: #4B5563; line-height: 1.6;">
      If you have any questions or need assistance, feel free to reach out to our support team at any time. We're always here to help.
    </p>

    <p style="font-size: 16px; color: #4B5563;">Welcome aboard, and we can't wait to serve you the best of what Spring Foods has to offer!</p>

    <p style="font-size: 16px; color: #4B5563;">Warm regards,</p>
    <p style="font-size: 16px; color: #4B5563;">The Spring Foods Team</p>

    <hr style="margin-top: 20px; border: none; border-top: 1px solid #eaeaea;" />
    <p style="font-size: 12px; color: #9CA3AF; line-height: 1.5;">
      This is an automated message, please do not reply directly to this email. If you have any questions, visit our <a href="https://springfoods.com/support" style="color: #1D4ED8;">Help Center</a>.
    </p>
  </div>
`;

      await sendEmail({
        to: options.email,
        subject: "Welcome to Spring Foods!",
        html: emailHtml,
      });

      table.push(
        ["ID", savedUser._id],
        ["Email", savedUser.email],
        ["First Name", savedUser.first_name],
        ["Last Name", savedUser.last_name],
        ["Phone Number", savedUser.phone_number],
        ["Role", savedUser.role],
        ["Gender", savedUser.gender],
        ["Date of Birth", savedUser.date_of_birth],
        ["ZIP Code", savedUser.zip_code],
        ["Street", savedUser.street],
        ["City", savedUser.city],
        ["State", savedUser.state],
        ["Country", savedUser.country]
      );

      console.log(table.toString());
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      console.log(green("Command succeeded sucessfully..."));
      process.exit(1);
    }
  });

program
  .command("login-user")
  .description("Login a user")
  .option("--email <string>", "User's email address")
  .option("--password <string>", "User's password")
  .action(async (options) => {
    await connectDB();

    const { email, password } = options;

    const req = {
      body: { email, password },
    };

    const res = {
      status: (statusCode: number) => ({
        json: (response: object) => {
          console.log(`Status: ${statusCode}`);
          console.table(response);
        },
      }),
    };

    await signin_customer(req as any, res as any);
  });

program.parse(process.argv);
