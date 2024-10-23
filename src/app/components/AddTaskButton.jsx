import React from "react";
import PropTypes from "prop-types";

function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-3xl py-0 px-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out text-center w-fit text-white"
    >
      +
    </button>
  );
}
AddTaskButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddTaskButton;
