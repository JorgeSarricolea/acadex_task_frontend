import React, { useState } from "react";
import PropTypes from "prop-types";

const TaskSearch = ({ tasks, searchTerm, onSearchChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    onSearchChange(e); // Update the search term in the parent component
    setShowSuggestions(e.target.value.length > 0); // Show suggestions if there's input
  };

  // Filter tasks based on the search term to show only matching titles
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking a suggestion to populate the input and hide suggestions
  const handleSuggestionClick = (title) => {
    onSearchChange({ target: { value: title } }); // Set the input to the selected suggestion
    setShowSuggestions(false); // Hide suggestions after selecting one
  };

  return (
    <div className="mb-4 relative w-full">
      <div className="flex items-center border rounded w-full">
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
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 pl-1 border-none focus:outline-none rounded-r"
          onFocus={() =>
            setShowSuggestions(
              searchTerm.length > 0 && filteredTasks.length > 0
            )
          }
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
      </div>

      {showSuggestions && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md max-h-40 overflow-y-auto z-10">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                onClick={() => handleSuggestionClick(task.title)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {task.title}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

TaskSearch.propTypes = {
  tasks: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default TaskSearch;
