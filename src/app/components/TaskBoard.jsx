import React, { useState, useEffect } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import AddTaskButton from "./AddTaskButton";
import DraggableTaskCard from "./DraggableTaskCard";
import DeleteTaskModal from "./modals/DeleteTaskModal";

// Import use cases
import { FetchHomeworksUseCase } from "@/app/application/use-cases/homework/GetAllHomeworks";
import { FetchAllCategoriesUseCase } from "@/app/application/use-cases/category/GetAllCategories";
import { UpdateHomeworkUseCase } from "@/app/application/use-cases/homework/UpdateHomework";
import { CreateHomeworkUseCase } from "@/app/application/use-cases/homework/CreateHomework";
import { DeleteHomeworkUseCase } from "@/app/application/use-cases/homework/DeleteHomework";

const TaskTypes = {
  TASK: "task",
};

function TaskBoard() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [userId, setUserId] = useState(null); // Add this state to hold userId

  // Fetch userId from sessionStorage on component mount (only in the browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("userId");
      setUserId(storedUserId); // Set the userId from sessionStorage
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await FetchHomeworksUseCase.execute();
      const userTasks = tasks.filter((task) => task.userId === userId);
      setBacklogTasks(userTasks.filter((task) => task.status === "TO_DO"));
      setInProgressTasks(
        userTasks.filter((task) => task.status === "IN_PROGRESS")
      );
      setDoneTasks(userTasks.filter((task) => task.status === "DONE"));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await FetchAllCategoriesUseCase.execute();
      setCategories(fetchedCategories); // Store categories in the state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch both tasks and categories
  useEffect(() => {
    if (userId) {
      // Only fetch tasks if userId is available
      fetchTasks();
    }
    fetchCategories(); // Fetch categories when the component loads
  }, [userId]); // Trigger this effect only when userId is set

  const handleTaskStatusChange = async (task, newStatus) => {
    try {
      const updatedTask = await UpdateHomeworkUseCase.execute(task.id, {
        ...task,
        status: newStatus,
      });

      setBacklogTasks((prev) => prev.filter((t) => t.id !== task.id));
      setInProgressTasks((prev) => prev.filter((t) => t.id !== task.id));
      setDoneTasks((prev) => prev.filter((t) => t.id !== task.id));

      if (newStatus === "TO_DO")
        setBacklogTasks((prev) => [...prev, updatedTask]);
      if (newStatus === "IN_PROGRESS")
        setInProgressTasks((prev) => [...prev, updatedTask]);
      if (newStatus === "DONE") setDoneTasks((prev) => [...prev, updatedTask]);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await CreateHomeworkUseCase.execute(newTask);
      if (createdTask.status === "TO_DO")
        setBacklogTasks((prev) => [...prev, createdTask]);
      if (createdTask.status === "IN_PROGRESS")
        setInProgressTasks((prev) => [...prev, createdTask]);
      if (createdTask.status === "DONE")
        setDoneTasks((prev) => [...prev, createdTask]);
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };

  const handleTaskUpdate = async (updatedTaskData) => {
    try {
      const updatedTask = await UpdateHomeworkUseCase.execute(
        updatedTaskData.id,
        updatedTaskData
      );

      setBacklogTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      setInProgressTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      setDoneTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const openModalForColumn = (column) => {
    setCurrentColumn(column);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion and proceed to delete task
  const confirmDeleteTask = async () => {
    try {
      if (taskToDelete) {
        await DeleteHomeworkUseCase.execute(taskToDelete.id);
        setBacklogTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
        setInProgressTasks((prev) =>
          prev.filter((t) => t.id !== taskToDelete.id)
        );
        setDoneTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      }
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);

    if (category) {
      return category.name;
    } else {
      return "Unknown Category";
    }
  };

  const TaskColumn = ({ status, tasks, onDropTask, onAddTask }) => {
    const [, drop] = useDrop({
      accept: TaskTypes.TASK,
      drop: (task) => onDropTask(task),
    });

    return (
      <div
        ref={drop}
        className="flex-1 bg-gray-100 rounded-lg shadow-md p-4"
        style={{ minHeight: "300px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{status.replace("_", " ")}</h2>
          <AddTaskButton onClick={onAddTask} />
        </div>
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onDelete={() => handleDeleteTask(task)}
            onEdit={() => handleEditTask(task)}
            categoryName={getCategoryName(task.categoryId)} // Pass the category name to the card
          />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          status="TO_DO"
          tasks={backlogTasks}
          onDropTask={(task) => handleTaskStatusChange(task, "TO_DO")}
          onAddTask={() => openModalForColumn("TO_DO")}
        />
        <TaskColumn
          status="IN_PROGRESS"
          tasks={inProgressTasks}
          onDropTask={(task) => handleTaskStatusChange(task, "IN_PROGRESS")}
          onAddTask={() => openModalForColumn("IN_PROGRESS")}
        />
        <TaskColumn
          status="DONE"
          tasks={doneTasks}
          onDropTask={(task) => handleTaskStatusChange(task, "DONE")}
          onAddTask={() => openModalForColumn("DONE")}
        />
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        column={currentColumn}
        userId={userId}
        categories={categories}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={selectedTask}
        onSave={handleTaskUpdate}
        categories={categories}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
        taskTitle={taskToDelete?.title || ""}
      />
    </DndProvider>
  );
}

export default TaskBoard;
