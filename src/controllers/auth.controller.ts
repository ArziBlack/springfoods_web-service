import CryptoJS from "crypto-js";
import { User } from "../models/user.model";
import { Contact } from "../models/contact.model";
import { TypedRequest, TypedResponse } from "../typings";
import {
  signinSchema,
  signupSchema,
} from "../services/validation/authValidator";
import { isPasswordValid } from "../utils/cryptoJS";
import { signToken, TokenPayload } from "../services/jwtService";
import { ISigninRequest, ISigninResponse, ISignupRequest, ISignupResponse } from "../interfaces/auth";

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
  res: TypedResponse<ISigninResponse | ApiErrorResponse>
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
    }).populate('contact');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email does not Exist",
        errors: {},
      });
    }

    if(user.password) {
        const isValid = await isPasswordValid(req.body.password, user?.password);
        if (!isValid) {
          return res.status(401).json({
            success: false,
            message: "Invalid Password",
            errors: { error: "password do not match" },
          });
        }
    }


    const payload: TokenPayload = {
      userId: user._id,
      role: user.role,
    };

    const token = await signToken(payload);

    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { ...userWithoutPassword, token },
    });
  } catch (error) {}
};
