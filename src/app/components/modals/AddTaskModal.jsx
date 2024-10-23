import React, { useState } from "react";
import PropTypes from "prop-types";

function AddTaskModal({ isOpen, onClose, onSave, column, userId, categories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    if (title.trim() === "" || categoryId.trim() === "") {
      alert("El título y la categoría son obligatorios.");
      return;
    }

    const isoStartDate = startDate ? new Date(startDate).toISOString() : null;
    const isoEndDate = endDate ? new Date(endDate).toISOString() : null;

    const newTask = {
      title,
      description,
      startDate: isoStartDate,
      endDate: isoEndDate,
      categoryId,
      status: column,
      userId,
    };

    onSave(newTask);
    onClose();
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setCategoryId("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold mb-4 text-blue-600">
          Añadir Nueva Tarea
        </h2>
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la Tarea
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción de la Tarea
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  column: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AddTaskModal;
