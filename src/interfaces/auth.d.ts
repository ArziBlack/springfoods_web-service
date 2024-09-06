
interface ISignupRequest {
  password: string;
  role: "user" | "admin" | "vendor";
  gender: "male" | "female" | "non-binary" | "prefer not to say";
  email: string;
  profile_image: string;
  date_of_birth: Date;
  first_name: string;
  last_name: string;
  phone_number: number;
  isEmailVerified: boolean;
  last_login: Date;
  zip_code: number;
  street: string;
  city: string;
  state: string;
  country: string;
}

interface ISignupResponse {}

interface ISigninRequest {
  email: string;
  password: string;
}
