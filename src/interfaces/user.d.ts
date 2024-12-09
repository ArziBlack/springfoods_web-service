export interface IContact {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  zip_code: number;
  street: string;
  city: string;
  state: string;
  country: string;
}

// Interface for User
export interface IUser {
  password: string;
  email: string;
  role: "user" | "admin" | "vendor";
  total_no_of_purchases: number;
  profile_image: string;
  gender: "male" | "female" | "non-binary" | "prefer not to say";
  contact: Types.ObjectId | IContact;
  date_of_birth?: Date;
  isEmailVerified: boolean;
  last_login: Date;
  full_name?: string;
}
