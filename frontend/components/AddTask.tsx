import { useEffect, useState } from "react";
import "../src/css/AddTask.css";
import type { TaskType } from "../src/App" // reuse TaskType interface
// import dotenv from "dotenv"
// dotenv.config();
const API_URL = import.meta.env.VITE_API_URL;
// import { useRef}

interface AddTaskProps {
  modalOpen: boolean;
  handleClose: () => void;
  setTodoList: React.Dispatch<React.SetStateAction<TaskType[]>>;
  editTask: TaskType | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddTask({
  modalOpen,
  handleClose,
  setTodoList,
  editTask,
  setPage,    
  setTotalPages
}: AddTaskProps) {
  const [priority, setPriority] = useState<string>("Low");
  const [title, setTitle] = useState<string>("");
  
  // const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editTask) {
      setPriority(editTask.priority);
      setTitle(editTask.title);
    } else if(modalOpen) {
      setPriority("Low");
      setTitle("");
    }
  }, [editTask, modalOpen]);

  if (!modalOpen) return null;

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!title.trim()) return;

  try {
    if (editTask) {
      // Update existing task (PUT request)
      const response = await fetch(`${API_URL}/${editTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, priority }),
      });

      const updatedTask = await response.json();

      setTodoList((prevTodo) =>
        prevTodo.map((task) =>
          task._id === editTask._id ? updatedTask : task
        )
      );
    } else {
      // Add new task (POST request)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          priority: priority, 
          status: "To Do",
          completed: false,
        }),
      });

      const newTask = await response.json();

      // Update list
      setTodoList((prevTodo) => [...prevTodo, newTask]);

      // Update pagination
      setTotalPages((prevTotal) => prevTotal + 1);
      setPage((prevPage) => prevPage + 1);
    }

    handleClose();
  } catch (error) {
    console.error("Error saving task:", error);
  }
}

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="add-task">
            <div className="add-task-title">
              <span>{editTask ? "Edit Task" : "Add Task"}</span>
              <img onClick={handleClose} src="../src/assets/close.png"alt="close" />
            </div>

            <div className="add-task-input" >
              <span className="grayColor">Task</span>
              <input
              // ref={inputRef}
                name="task"
                placeholder="Type your task here..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // onFocus={() => {
                //   // Clear browser suggestions on focus
                //   if (inputRef.current) {
                //     inputRef.current.value = "";
                //   }
                // }}
                autoComplete="off"
              />
            </div>

            <div className="add-task-priority">
              <span className="grayColor">Priority</span>
              <ul className="priority-buttons">
                {["High", "Medium", "Low"].map((level) => (
                  <li
                    key={level}
                    onClick={() => setPriority(level)}
                    className={`${priority === level ? "selected" : ""} ${level.toLowerCase()}`}
                  >
                    {level}
                  </li>
                ))}
              </ul>
            </div>
            <div className="add-task-button">
              <button type="submit">{editTask ? "Update" : "Add"}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
