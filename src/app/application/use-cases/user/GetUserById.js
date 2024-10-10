import { getUserById } from "@/app/application/services/UserService";
import { getUserId } from "@/app/application/services/StorageService";

/**
 * The function `handleFetchUser` fetches user data based on a user ID and handles errors gracefully.
 * @returns The `handleFetchUser` function returns the user data if it is successfully fetched, or it
 * returns `null` if there is an error or if the user ID is missing.
 */
export const handleFetchUser = async () => {
  const userId = getUserId();

  if (!userId) {
    return null;
  }

  try {
    const userData = await getUserById(userId);
    return userData;
  } catch (error) {
    return null;
  }
};
