import CryptoJS from "crypto-js";

export const isPasswordValid = async (
  inputPassword: string,
  storedHash: string,
) => {
  const inputHash = await CryptoJS.SHA256(inputPassword).toString();
  console.table("input hash: " + inputHash);
  console.table("stored hash: " + storedHash);
  return inputHash === storedHash;
};
