"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "@/app/application/services/AuthService.js";
import { getUserEmail } from "@/app/application/services/StorageService.js";

export const useAuth = () => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      if (!isValid) {
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
