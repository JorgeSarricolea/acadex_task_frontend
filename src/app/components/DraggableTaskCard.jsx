import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { formatDate } from "@/app/utils/formatDate";
import Tag from "./Tag";

const DraggableTaskCard = ({ task, onDelete, onEdit, categoryName }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, zIndex: 1 }}
      className="relative bg-gray-200 p-4 rounded-lg shadow hover:cursor-pointer gap-4 mb-4"
    >
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p>
          <strong>Fecha de entrega:</strong> {formatDate(task.endDate)}
        </p>
        <div className="mt-2">
          <Tag label={categoryName} />
        </div>
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button onClick={onEdit}>
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
        <button onClick={onDelete}>
          <span role="img" aria-label="delete">
            🗑️
          </span>
        </button>
      </div>
    </div>
  );
};

DraggableTaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    endDate: PropTypes.string,
    categoryId: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default DraggableTaskCard;
