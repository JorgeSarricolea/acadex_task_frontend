import { loginUser } from "@/app/application/services/AuthService.js";
import { validateToken } from "@/app/application/services/AuthService.js";

export const authenticateUser = async (input) => {
  try {
    const { token } = await loginUser(input.email, input.password);

    if (!token) {
      throw new Error("Token missing from login response");
    }

    const validationResponse = await validateToken(token);

    if (!validationResponse.isValid) {
      throw new Error("Invalid token");
    }

    return {
      token,
      decoded: validationResponse.decoded,
    };
  } catch (error) {
    throw new Error(error.message || "Error during authentication");
  }
};
