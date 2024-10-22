import { useState } from "react";

function TaskBoard() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    // Agregar la tarea al Backlog por defecto
    setBacklogTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask(""); // Limpiar el campo de entrada
  };

  const handleDeleteTask = (task, column) => {
    if (column === "backlog") {
      setBacklogTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    } else if (column === "inProgress") {
      setInProgressTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    } else if (column === "done") {
      setDoneTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    }
  };

  const handleEditTask = (task, column) => {
    const newTaskName = prompt("Edita la tarea:", task);
    if (newTaskName && newTaskName.trim() !== "") {
      if (column === "backlog") {
        setBacklogTasks((prevTasks) =>
          prevTasks.map((t) => (t === task ? newTaskName : t))
        );
      } else if (column === "inProgress") {
        setInProgressTasks((prevTasks) =>
          prevTasks.map((t) => (t === task ? newTaskName : t))
        );
      } else if (column === "done") {
        setDoneTasks((prevTasks) =>
          prevTasks.map((t) => (t === task ? newTaskName : t))
        );
      }
    }
  };

  return (
    // Línea nueva para hacer el tablero responsive
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
      <div className="flex-1 bg-red-100 rounded-lg shadow-md p-2">
        <div className="flex justify-between items-center p-2 bg-red-400 rounded-t-lg">
          <h2 style={{ color: '#60170c' }} className="text-custom-burgundy font-bold text-2xl text-center flex-1">To do</h2>
          <button className="bg-green-300 text-black p-2 text-xl rounded hover:scale-110 hover:text-white hover:bg-green-500 transition-transform">+</button>
        </div>
        {backlogTasks.map((task, index) => (
          // Línea modificada para alinear tareas horizontalmente
          <div key={index} className="flex justify-between items-center bg-orange-300 p-4 m-2 rounded-lg shadow">
            <span>{task}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleEditTask(task, "backlog")}>
                <span role="img" aria-label="edit">✏️</span>
              </button>
              <button onClick={() => handleDeleteTask(task, "backlog")}>
                <span role="img" aria-label="delete">🗑️</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-blue-100 rounded-lg shadow-md p-2">
        <div className="flex justify-between items-center p-2 bg-blue-300 rounded-t-lg">
          <h2 style={{ color: '#1d4a99' }} className="text-custom-burgundy font-bold text-2xl text-center flex-1">In progress</h2>
          <button className="bg-green-300 text-black p-2 text-xl rounded hover:scale-110 hover:text-white hover:bg-green-500 transition-transform">+</button>
        </div>
        {inProgressTasks.map((task, index) => (
          // Línea modificada para alinear tareas horizontalmente
          <div key={index} className="flex justify-between items-center bg-blue-300 p-4 m-2 rounded-lg shadow">
            <span>{task}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleEditTask(task, "inProgress")}>
                <span role="img" aria-label="edit">✏️</span>
              </button>
              <button onClick={() => handleDeleteTask(task, "inProgress")}>
                <span role="img" aria-label="delete">🗑️</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-green-100 rounded-lg shadow-md p-2">
        <div className="flex justify-between items-center p-2 bg-green-300 rounded-t-lg">
          <h2 style={{ color: '#0e6332' }} className="text-custom-burgundy font-bold text-2xl text-center flex-1">Done</h2>
        </div>
        {doneTasks.map((task, index) => (
          // Línea modificada para alinear tareas horizontalmente
          <div key={index} className="flex justify-between items-center bg-pink-300 p-4 m-2 rounded-lg shadow">
            <span>{task}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleEditTask(task, "done")}>
                <span role="img" aria-label="edit">✏️</span>
              </button>
              <button onClick={() => handleDeleteTask(task, "done")}>
                <span role="img" aria-label="delete">🗑️</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
