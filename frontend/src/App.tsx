import { useState,useEffect } from "react";
import Task from "../components/Task";
import Header from "../components/Header";
import "./App.css";
// import initialTasks from "../data";
import AddTask from "../components/AddTask";

// Define a Task type
export interface TaskType {
  _id: string;
  title: string;
  priority: string;
  status: string;
  completed : boolean
}

function App() {
  const [todoList, setTodoList] = useState<TaskType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TaskType | null>(null);

  const handleClose = () => {
    setModalOpen(false);
    setEditTask(null); // reset after close
  };

  const handleOpen = (task: TaskType | null = null) => {
    setEditTask(task); // null → add, object → edit
    setModalOpen(true);
  };

  const handleDelete = async (_id: string) => {
  try {
    // 🔹 Call backend DELETE API
    const response = await fetch(`http://localhost:3000/api/todos/${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // 🔹 Remove from frontend state
      setTodoList((prev) => prev.filter((task) => task._id !== _id));
    } else {
      console.error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const handleStatusChange = async (id: string, newStatus: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTodoList((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status: updatedTask.status } : task
        )
      );
    } else {
      console.error("Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};


   useEffect(() => {
    const fetchTodos = async () =>{
      try {
        const response = await fetch('http://localhost:3000/api/todos');
        const todoData = await response.json();

        setTodoList(todoData);
        // console.log("todoData: ",todoData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodos();
  },[]);

  const eachTask = todoList.map((todo) => (
    <Task
      key={todo._id}
      {...todo}
      onEdit={() => handleOpen(todo)} // edit
      onDelete={() => handleDelete(todo._id)} // delete
      onStatusChange={handleStatusChange} // status chg
    />
  ));

  return (
    <div className="container">
      <Header modalOpen={modalOpen} handleOpen={() => handleOpen()} />
      <main className="taskContainer">{eachTask}</main>
      <AddTask
        modalOpen={modalOpen}
        handleClose={handleClose}
        setTodoList={setTodoList}
        editTask={editTask} 
      />
    </div>
  );
}

export default App;
