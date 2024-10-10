"use client";

import React, { useEffect, useState } from "react";
import { setUserName } from "@/app/application/services/StorageService";
import { handleFetchUser } from "@/app/application/use-cases/user/GetUserById.js";
import { handleUpdateUser } from "@/app/application/use-cases/user/UpdateUser.js";

function EditUserModal({ isOpen, onClose }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchUserData = async () => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const user = await handleFetchUser();

        if (user) {
          setUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        } else {
          setError("Error fetching user data");
        }
        setLoading(false);
      };

      fetchUserData();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const updatedUser = await handleUpdateUser(userData);

      if (updatedUser && updatedUser.firstName) {
        setSuccessMessage("Usuario actualizado correctamente");

        setUserName(updatedUser.firstName);

        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setErrorMessage("Error al procesar la actualización");
      }
    } catch (error) {
      setErrorMessage("Error al actualizar el usuario");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-medium mb-4 text-blue-600 font-montserrat">
          Editar Usuario
        </h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-montserrat"
                placeholder="Nombre Actual"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-montserrat"
                placeholder="Apellido Actual"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-montserrat"
                placeholder="Email Actual"
              />
            </div>

            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 font-montserrat font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-montserrat font-medium"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditUserModal;
