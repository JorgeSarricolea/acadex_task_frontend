"use client";

import { useState } from "react";
import { useForm } from "@/app/hooks/useForm.js";
import { useRouter } from "next/navigation";
import { useResponsiveBackground } from "@/app/hooks/useResponsiveBackground";
import FormInput from "@/app/components/FormInputs.js";
import user_icon from "@/app/public/assets/icons/person.svg";
import password_icon from "@/app/public/assets/icons/password.svg";
import { authenticateUser } from "@/app/application/use-cases/auth/LoginUser.js";
import {
  setToken,
  setUserId,
  setUserEmail,
} from "@/app/application/services/StorageService.js";

export default function Login() {
  const router = useRouter();
  const bgImage = useResponsiveBackground();

  const [formData, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const loggedInUser = await authenticateUser(formData);

      if (loggedInUser.token) {
        const { token, decoded } = loggedInUser;
        const { id, email } = decoded;

        setToken(token);
        setUserId(id);
        setUserEmail(email);

        router.push("/home");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div
      className="signup grid place-items-center min-h-screen bgBlue px-4 bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage.primary.src}), url(${bgImage.secondary.src})`,
        backgroundPosition: "right top, left bottom",
        backgroundSize: "contain, auto",
      }}
    >
      <div className="signup__container w-full text-center">
        <h1 className="signup__title text-4xl sm:text-5xl lg:text-6xl font-montserrat text-white font-light">
          ¡BIENVENIDO!
        </h1>
        <h3 className="signup_subtitle text-xl sm:text-2xl lg:text-3xl font-montserrat text-white my-4 font-light lg:w-full">
          A LA MEJOR APLICACIÓN DE GESTIÓN DE TAREAS ACADÉMICAS
        </h3>

        <form
          onSubmit={handleSubmit}
          className="signup__form my-8 text-center mt-14 w-full sm:w-3/4 lg:w-1/4 mx-auto"
        >
          <FormInput
            icon={user_icon}
            type="email"
            name="email"
            placeholder="CORREO ELECTRÓNICO"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            icon={password_icon}
            type="password"
            name="password"
            placeholder="CONTRASEÑA"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="signup__btn border border-white my-4 w-1/2 sm:w-full p-2 rounded-md bg-white text-blue-700 font-montserrat text-base font-semibold shadow-lg"
          >
            INICIAR SESIÓN
          </button>

          <button
            type="button"
            className="signup__btn border border-white my-4 w-1/2 sm:w-full p-2 rounded-md bg-white text-blue-700 font-montserrat text-base font-semibold shadow-lg"
            onClick={() => router.push("/signup")}
          >
            REGISTRATE
          </button>
        </form>

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
