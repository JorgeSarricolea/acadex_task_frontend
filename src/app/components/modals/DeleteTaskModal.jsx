import React from "react";
import PropTypes from "prop-types";

const DeleteTaskModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Eliminar tarea</h2>
        <p className="mb-4">
          ¿Estás seguro de que quieres eliminar la tarea{" "}
          <span className="font-semibold">"{taskTitle}"</span>? Esta acción no
          se puede deshacer.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  taskTitle: PropTypes.string.isRequired,
};

export default DeleteTaskModal;
