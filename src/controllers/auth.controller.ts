import CryptoJS from "crypto-js";
import { NextFunction, Response } from "express";
import { User } from "../models/user.model";
import { Contact } from "../models/contact.model";
import { TypedRequest, TypedResponse } from "../typings";
import {
  signinSchema,
  signupSchema,
} from "../services/validation/authValidator";
import { isPasswordValid } from "../utils/cryptoJS";
import { signToken, TokenPayload } from "../services/jwtService";
import {
  ISignupRequest,
  ISignupResponse,
  ISigninRequest,
} from "../interfaces/auth";
import { ApiErrorResponse, ApiResponse } from "../typings/response";
import { sendEmail } from "../services/emailService";
import { verify_email_token } from "../services/verifyService";

// SIGNUP CUSTOMER
export const signup_customer = async (
  req: TypedRequest<ISignupRequest>,
  res: TypedResponse<ISignupResponse | ApiErrorResponse>
) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const contact = await new Contact({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      zip_code: req.body.zip_code,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      street: req.body.street,
    });

    const savedContact = await contact.save();

    const user = await new User({
      contact: savedContact._id,
      date_of_birth: req.body.date_of_birth,
      role: req.body.role,
      gender: req.body.gender,
      email: req.body.email,
      password: CryptoJS.SHA256(req.body.password).toString(),
      isEmailVerified: req.body.isEmailVerified,
      last_login: req.body.last_login,
    });

    const savedUser = await user.save();

    const payload: TokenPayload = {
      userId: user.email.toString(),
      role: user.role,
    };

    const verificationToken = await signToken(payload);

    const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h1 style="font-size: 24px; font-weight: bold; color: #1D4ED8;">Welcome to Spring Foods!</h1>
    <p style="font-size: 16px; color: #4B5563;">Dear ${savedContact.first_name},</p>

    <p style="font-size: 16px; color: #4B5563; line-height: 1.6;">
      We're thrilled to have you join the Spring Foods community! To get started, please verify your account by clicking the button below. Verifying your account helps us ensure the security of your information and gives you full access to our features.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://springfoods.com/verify/${savedContact.email}/${verificationToken}" 
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
      to: req.body.email,
      subject: "Welcome to BlackMarket!",
      html: emailHtml,
    });

    const response: ApiResponse<ISignupResponse> = {
      success: true,
      message: "signed up successfully",
      data: { id: savedUser._id },
    };

    res.status(201).json(response);
  } catch (error: unknown) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Error signing up customer",
      errors: {
        general: [error instanceof Error ? error.message : "Unknown error"],
      },
    };

    res.status(500).json(response);
  }
};

// SIGNIN CUSTOMER
export const signin_customer = async (
  req: TypedRequest<ISigninRequest>,
  res: Response
) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Login Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const user = await User.findOne({
      email: req.body.email,
    }).populate("contact");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email does not Exist",
        errors: {},
      });
    }

    if (user.password) {
      const isValid = await isPasswordValid(req.body.password, user?.password);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid Password",
          errors: { error: "password do not match" },
        });
      }
    }

    if (!user.email) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    const payload: TokenPayload = {
      userId: user.email.toString(),
      role: user.role,
    };

    const token = await signToken(payload);

    const userObject = user.toObject();

    const { password, ...userWithoutPassword } = userObject;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { ...userWithoutPassword, token },
    });
  } catch (error: unknown) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Error signing customer",
      errors: {
        general: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
    console.log(error);
    res.status(500).json(response);
  }
};

// VERIFY EMAIL FOR CUSTOMER SIGNUP
export const verify_email = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<null>>,
  next: NextFunction
) => {
  try {
    const email = req.params?.email;
    const token = req.params?.token;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email cannot be empty or null!",
      });
    }

    const decoded = await verify_email_token(token);

    const updatedUser = await User.findOneAndUpdate(
      { email: email, _id: decoded },
      { isEmailVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User with this email not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(error);
  }
};
