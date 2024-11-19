"use client";

import { useState } from "react";
import { useForm } from "@/app/hooks/useForm.js";
import { useRouter } from "next/navigation";
import { useResponsiveBackground } from "@/app/hooks/useResponsiveBackground";
import FormInput from "@/app/components/FormInputs";
import user_icon from "@/app/public/assets/icons/person.svg";
import email_icon from "@/app/public/assets/icons/email.svg";
import password_icon from "@/app/public/assets/icons/password.svg";
import { registerUser } from "@/app/application/use-cases/auth/SignupUser.js";

export default function Signup() {
  const router = useRouter();
  const bgImage = useResponsiveBackground();

  const [formData, handleChange] = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await registerUser(formData);
      setErrorMessage(null);
      setSuccessMessage("Usuario registrado exitosamente");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error.message || "Hubo un error en el registro");
      console.error("Error:", error);
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
          REGISTRATE
        </h1>
        <h3 className="signup_subtitle text-xl sm:text-2xl lg:text-3xl font-montserrat text-white my-4 font-light lg:w-full">
          Y EMPIEZA A GESTIONAR TUS TAREAS ACADÉMICAS
        </h3>
        <form
          onSubmit={handleSubmit}
          className="signup__form my-8 text-center mt-14 w-full sm:w-3/4 lg:w-1/4 mx-auto"
        >
          <FormInput
            icon={user_icon}
            type="text"
            name="firstName"
            placeholder="NOMBRE"
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormInput
            icon={email_icon}
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
          <div className="mx-10 md:mx-0">
            <button
              type="submit"
              className="signup__btn border border-white my-4 w-full p-2 rounded-md bg-white text-blue-700 font-montserrat text-base font-semibold shadow-lg"
            >
              REGISTRATE
            </button>
          </div>
        </form>

        {/* Messages */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}
