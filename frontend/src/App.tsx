import { useState,useEffect } from "react";
import Task from "../components/Task";
import Header from "../components/Header";
import "./App.css";
import initialTasks from "../data";
import AddTask from "../components/AddTask";

// Define a Task type
export interface TaskType {
  id: number;
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

  const handleDelete = (id: number) => {
    setTodoList((prev) => prev.filter((task) => task.id !== id));
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
      key={todo.id}
      {...todo}
      onEdit={() => handleOpen(todo)} // click edit
      onDelete={() => handleDelete(todo.id)}
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
