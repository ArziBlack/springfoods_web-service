import CryptoJS from "crypto-js";

export const isPasswordValid = (inputPassword: string, storedHash: string) => {
  const inputHash = CryptoJS.SHA256(inputPassword).toString();
  return inputHash === storedHash;
};
