import { User } from "@/app/domain/entities/User.js";
import endpoints from "@/app/infrastructure/config/configAPI.js";

export const signupUser = async (userData) => {
  const response = await fetch(endpoints.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    } else {
      throw new Error(
        `Unexpected server response: ${response.status} ${response.statusText}`
      );
    }
  }

  const responseData = await response.json();

  return new User({
    id: responseData.id,
    firstName: responseData.firstName,
    lastName: responseData.lastName,
    email: responseData.email,
  });
};
