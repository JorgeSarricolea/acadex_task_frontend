import endpoints from "@/app/infrastructure/config/configAPI.js";
import { UserPresenter } from "@/app/interfaces/presenters/UserPresenter.js";

/**
 * The function `updateUser` sends a PUT request to update user data and returns the updated user
 * object.
 * @param userId - The `userId` parameter in the `updateUser` function represents the unique identifier
 * of the user whose data is being updated. This identifier is used to specify which user's information
 * should be modified in the system.
 * @param userData - The `userData` parameter in the `updateUser` function represents the data that you
 * want to update for a specific user. This data should be in JSON format and will be sent in the
 * request body to the server when updating the user information. It typically includes fields such as
 * name, email, address
 * @returns The updateUser function returns the updated user data after making a PUT request to update
 * the user information.
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(endpoints.updateUser(userId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating user data");
    }

    const responseData = await response.json();

    const updatedUser = UserPresenter.toUser(responseData);

    if (!updatedUser) {
      throw new Error("Error al procesar la actualización del usuario");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Error updating user details");
  }
};

/**
 * The `getUserById` function fetches user data by user ID.
 * @param userId - The ID of the user to be fetched.
 * @returns A Promise that resolves to the user data returned by the server, processed using
 * `UserPresenter.toUser`.
 */
export const getUserById = async (userId) => {
  try {
    const response = await fetch(endpoints.getUserById(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching user data");
    }

    const responseData = await response.json();
    return UserPresenter.toUser(responseData);
  } catch (error) {
    throw new Error(error.message || "Error fetching user details");
  }
};
