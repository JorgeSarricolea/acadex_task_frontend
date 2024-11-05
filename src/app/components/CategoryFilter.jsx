import React, { useState } from "react";
import PropTypes from "prop-types";

const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      // Reset selected categories when hiding the dropdown
      onCategoryChange([]);
    }
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (categoryId) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelectedCategories);
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      onCategoryChange([]);
    } else {
      onCategoryChange(categories.map((category) => category.id));
    }
  };

  return (
    <div className="relative mb-4 rounded w-64">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between p-2 border rounded bg-white"
      >
        <span>{isOpen ? "Hide Categories" : "Filter by Category"}</span>
        <span className="pl-3 pr-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V18a1 1 0 01-.447.894l-4 2.5A1 1 0 018 20.5V12.414L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute mt-2 w-full border rounded bg-white shadow-md max-h-60 overflow-y-auto"
          style={{ zIndex: 50 }}
        >
          <label className="flex items-center p-2 border-b cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.length === categories.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center p-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
