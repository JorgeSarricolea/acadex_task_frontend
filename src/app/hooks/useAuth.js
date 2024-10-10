import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "@/app/application/services/AuthService.js";
import {
  getUserEmail,
  getToken,
} from "@/app/application/services/StorageService.js";

export const useAuth = () => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken(); // Get token from sessionStorage

      if (!token) {
        router.push("/login");
        return;
      }

      const validationResponse = await validateToken(token); // Validate token

      // Ensure you're checking the correct response structure (isValid)
      if (!validationResponse || !validationResponse.isValid) {
        router.push("/login");
      } else {
        const email = getUserEmail();
        setUserEmail(email);
      }
    };

    checkAuth();
  }, [router]);

  return { userEmail };
};
