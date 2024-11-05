import React, { useState, useEffect } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import AddTaskButton from "./AddTaskButton";
import DraggableTaskCard from "./DraggableTaskCard";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import TaskSearch from "./TaskSearch";
import CategoryFilter from "./CategoryFilter";
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
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("userId");
      setUserId(storedUserId);
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
      setFilteredTasks(userTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await FetchAllCategoriesUseCase.execute();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
    fetchCategories();
  }, [userId]);

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

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

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

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterTasks(term, selectedCategories);
  };

  const handleCategoryChange = (selectedCategoryIds) => {
    setSelectedCategories(selectedCategoryIds);
    filterTasks(searchTerm, selectedCategoryIds);
  };

  const filterTasks = (term, categories) => {
    setFilteredTasks(
      [...backlogTasks, ...inProgressTasks, ...doneTasks].filter(
        (task) =>
          task.title.toLowerCase().includes(term.toLowerCase()) &&
          (categories.length === 0 || categories.includes(task.categoryId))
      )
    );
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
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
            onEdit={() => handleTaskUpdate(task)}
            categoryName={getCategoryName(task.categoryId)}
          />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-between items-start mb-4 gap-12 w-4/5 m-auto">
        <TaskSearch
          tasks={[...backlogTasks, ...inProgressTasks, ...doneTasks]}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          className="flex-grow mr-4"
        />

        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          className="w-1/4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          status="TO_DO"
          tasks={filteredTasks.filter((task) => task.status === "TO_DO")}
          onDropTask={(task) => handleTaskStatusChange(task, "TO_DO")}
          onAddTask={() => openModalForColumn("TO_DO")}
        />
        <TaskColumn
          status="IN_PROGRESS"
          tasks={filteredTasks.filter((task) => task.status === "IN_PROGRESS")}
          onDropTask={(task) => handleTaskStatusChange(task, "IN_PROGRESS")}
          onAddTask={() => openModalForColumn("IN_PROGRESS")}
        />
        <TaskColumn
          status="DONE"
          tasks={filteredTasks.filter((task) => task.status === "DONE")}
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
