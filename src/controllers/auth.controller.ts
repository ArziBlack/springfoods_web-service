import { User } from "../models/user.model";
import { Contact } from "../models/contact.model";
import { TypedRequest, TypedResponse } from "../typings";

export const signup_customer = async (
  req: TypedRequest<ISignupRequest>,
  res: TypedResponse<ISignupResponse>
) => {
  try {
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
      isEmailVerified: req.body.isEmailVerified,
      last_login: req.body.last_login,
    });

    const savedUser = await user.save();

    const response: ApiResponse<ISignupResponse> = {
      success: true,
      message: "signed up successfully",
      data: { ...savedUser, savedContact: contact },
    };

    res.status(201).json(response);

  } catch (error: unknown) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Error signing up customer",
      errors: error,
    };
  }
};
