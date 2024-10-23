"use client";

import {
  clearStorage,
  getUserName,
} from "@/app/application/services/StorageService";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import EditUserModal from "./modals/EditUserModal";

function Header() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = getUserName();
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    clearStorage();
    router.push("/login");
  };

  const handleEditUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-700 text-white shadow-md">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
          {/* Hamburger menu */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <span className="text-2xl font-semibold">Acadex</span>
      </div>

      <div>
        {userName ? (
          <div className="flex items-center">
            <span>Hola, {userName}</span>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 text-white shadow-md sidebar">
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Acadex</h2>

              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Edit user */}
            <div className="mt-auto">
              <button
                onClick={handleEditUser}
                className="text-sm hover:bg-gray-700 w-full text-left px-4 py-2 rounded-md mb-2"
              >
                Editar usuario
              </button>

              {/* Log user out */}
              <button
                onClick={handleLogout}
                className="text-sm hover:bg-gray-700 w-full text-left px-4 py-2 rounded-md"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <EditUserModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}

export default Header;
