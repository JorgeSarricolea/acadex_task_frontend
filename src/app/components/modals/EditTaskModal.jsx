import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function EditTaskModal({ isOpen, onClose, onSave, task, categories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStartDate(task.startDate ? task.startDate.replace("Z", "") : "");
      setEndDate(task.endDate ? task.endDate.replace("Z", "") : "");
      setCategoryId(task.categoryId || "");
    }
  }, [task]);

  const handleSave = (e) => {
    e.preventDefault();

    // Validación: el título y la categoría son obligatorios
    if (title.trim() === "" || categoryId.trim() === "") {
      setErrorMessage("Title and category are mandatory.");
      return;
    }

    const now = new Date();
    const isoStartDate = startDate ? new Date(startDate) : null;
    const isoEndDate = endDate ? new Date(endDate) : null;

    // Validación: la fecha de inicio no puede ser anterior a hoy
    if (isoStartDate && isoStartDate < now.setHours(0, 0, 0, 0)) {
      setErrorMessage(
        "The start date cannot be earlier than the current date."
      );
      return;
    }

    // Validación: la fecha de finalización no puede ser anterior ni igual a la de inicio
    if (isoStartDate && isoEndDate && isoEndDate <= isoStartDate) {
      setErrorMessage(
        "The end date cannot be earlier or equal to the start date and time."
      );
      return;
    }

    const updatedTask = {
      ...task,
      title,
      description,
      startDate: isoStartDate ? isoStartDate.toISOString() : null,
      endDate: isoEndDate ? isoEndDate.toISOString() : null,
      categoryId,
    };

    onSave(updatedTask);
    onClose();
    setErrorMessage("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-4"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold mb-4 text-blue-600">Edit task</h2>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
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
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start date
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due date
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
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
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

export default EditTaskModal;
