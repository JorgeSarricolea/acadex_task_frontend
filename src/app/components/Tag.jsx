import React from "react";
import PropTypes from "prop-types";

const Tag = ({ label }) => {
  return (
    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
      {label}
    </span>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Tag;
