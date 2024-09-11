import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";
import { sendEmail } from "../services/emailService";
import { signToken, TokenPayload } from "../services/jwtService";
import { signupSchema } from "../services/validation/authValidator";
import { TypedRequest, TypedResponse } from "../typings";
import { ApiErrorResponse, ApiResponse } from "../typings/response";

// SIGNUP CUSTOMER
export const signup_admin = async (
    req: TypedRequest<ISignupRequest>,
    res: TypedResponse<ISignupResponse | ApiErrorResponse>,
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
        subject: "Spring Foods Onboarding",
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
