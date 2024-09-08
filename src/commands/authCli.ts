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
      <h1>Welcome to Spring Foods</h1>
      <p>Hi ${savedContact.first_name},</p>
      <p>Thank you for signing up. We're excited to have you on board!</p>
    `;

    await sendEmail({
      to: options.email,
      subject: "Welcome to BlackMarket!",
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
