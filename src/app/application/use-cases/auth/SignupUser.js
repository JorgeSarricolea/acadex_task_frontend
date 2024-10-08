import { signupUser } from "@/app/application/services/AuthService.js";

export const registerUser = async (input) => {
  try {
    const newUser = await signupUser({
      firstName: input.firstName,
      lastName: input.lastName || "",
      email: input.email,
      password: input.password,
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message || "Error registering the user");
  }
};
