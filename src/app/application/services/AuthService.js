import endpoints from "@/app/infrastructure/config/configAPI.js";
import { UserPresenter } from "@/app/interfaces/presenters/UserPresenter.js";

/**
 * The function `validateToken` asynchronously validates a token by sending a POST request to a
 * specified endpoint and returns an object indicating whether the token is valid along with decoded
 * data if valid.
 * @param token - The `validateToken` function you provided is used to validate a token by sending a
 * POST request to a specific endpoint with the token in the Authorization header. If the response
 * indicates that the token is valid, the function returns an object with `isValid` set to true and the
 * decoded token data. If
 * @returns The `validateToken` function returns an object with the following structure:
 */
export const validateToken = async (token) => {
  try {
    const response = await fetch(endpoints.validateToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { isValid: false };
    }

    const responseData = await response.json();

    if (responseData.message === "Token is valid") {
      return {
        isValid: true,
        decoded: responseData.decoded,
      };
    } else {
      return { isValid: false };
    }
  } catch (error) {
    return { isValid: false };
  }
};


/**
 * The `signupUser` function sends a POST request to a signup endpoint with user data, handles response
 * errors, and returns a user object.
 * @param userData - The `userData` parameter in the `signupUser` function represents the data of the
 * user that is being signed up. This data typically includes information such as the user's username,
 * email, password, and any other relevant details required for user registration. The `userData`
 * object should be structured according to
 * @returns The `signupUser` function returns a Promise that resolves to the user data after signing
 * up. The user data is processed and transformed using `UserPresenter.toUser` before being returned.
 */
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
      throw UserPresenter.toError(errorData);
    } else {
      throw new Error(
        `Unexpected server response: ${response.status} ${response.statusText}`
      );
    }
  }

  const responseData = await response.json();
  return UserPresenter.toUser(responseData);
};

/**
 * The loginUser function sends a POST request to a login endpoint with email and password, handles
 * errors, and returns a token from the response.
 * @param email - The `email` parameter in the `loginUser` function represents the email address of the
 * user trying to log in. It is used to identify the user during the authentication process.
 * @param password - The `password` parameter in the `loginUser` function represents the user's
 * password that they input when trying to log in to the system. It is a sensitive piece of information
 * that should be securely handled and transmitted to the server for authentication.
 * @returns {
 *   token: responseData.token,
 * }
 */
export const loginUser = async (email, password) => {
  const response = await fetch(endpoints.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error de autenticación");
    } else {
      throw new Error(
        `Unexpected server response: ${response.status} ${response.statusText}`
      );
    }
  }

  const responseData = await response.json();

  return {
    token: responseData.token,
  };
};
