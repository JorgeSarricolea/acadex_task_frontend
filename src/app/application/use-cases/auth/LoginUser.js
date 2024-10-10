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
      throw new Error("Invalid or expired token");
    }

    return {
      token,
      decoded: validationResponse.decoded,
    };
  } catch (error) {
    console.error("Authentication error:", error.message);
    throw new Error(error.message || "Error during authentication");
  }
};
