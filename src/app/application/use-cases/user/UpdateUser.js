import { getUserId } from "@/app/application/services/StorageService";
import { updateUser } from "@/app/application/services/UserService";

/**
 * The function `handleUpdateUser` updates user data for a specific user and returns the updated user
 * object or null if there is an error.
 * @param userData - userData is an object containing the updated information for a user. It may
 * include fields such as name, email, address, or any other user-related data that needs to be
 * updated.
 * @returns The function `handleUpdateUser` returns the updated user data if the update is successful.
 * If the user ID is missing or the update operation fails, it returns `null`.
 */
export const handleUpdateUser = async (userData) => {
  const userId = getUserId();

  if (!userId) {
    console.error("User ID is missing");
    return;
  }

  try {
    const updatedUser = await updateUser(userId, userData);
    if (!updatedUser) {
      throw new Error("Error al procesar la actualización del usuario");
    }
    return updatedUser;
  } catch (error) {
    // Lanza el error original del backend para que pueda ser manejado en el front-end
    throw error.response
      ? error.response
      : new Error("Error al actualizar el usuario");
  }
};
