import { useState } from "react";

// Define the Task props type
interface TaskProps {
  _id: string;
  title: string;
  priority: "High" | "Medium" | "Low" | string;
  status: string;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange:(_id:string, newStatus:string) => void;
}

export default function Task(props: TaskProps) {
  const [ isDisable, setIsDisable] = useState(false);
  const getColor = (priorityColor: string): string => {
    switch (priorityColor) {
      case "High":
        return "#f73446";
      case "Medium":
        return "#ffbd21";
      case "Low":
        return "#0ac947";
      default:
        return "black";
    }
  };

  function getProgress(status: string): number {
    const circumference = 2 * Math.PI * 11; 
    let percent = 0;
    if (status === "In Progress") percent = 50;
    if (status === "Done") percent = 100;
    return circumference - (percent / 100) * circumference;
  }

  const handleMultipleClick = () =>{
    
    const status = ["To Do", "In Progress","Done"]
    const newStatus = status[(status.indexOf(props.status) + 1) % status.length];
    props.onStatusChange(props._id, newStatus)
    setIsDisable(true);
    setTimeout(()=>{
      setIsDisable(false);
    },2000)
    
  }
  return (
    <>
      <div className="cards">
        <div className="taskName">
          <span className="grayColor">Task</span>
          <span>{props.title}</span>
        </div>
        <div className="prioritySet">
          <span className="grayColor">Priority</span>
          <span
            style={{
              color: getColor(props.priority),
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {props.priority}
          </span>
        </div>
        <div className="divStatus">
          <button className="status" onClick={handleMultipleClick} disabled={isDisable}>{props.status}</button>
        </div>
        <div className="progress">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="circular-progressbar"
          >
            <circle
              className="circle-background"
              cx="12"
              cy="12"
              r="11"
              strokeWidth="2px"
            ></circle>
            <circle
              className="circle-progress"
              cx="12"
              cy="12"
              r="11"
              strokeWidth="2px"
              transform="rotate(-90 12 12)"
              style={{strokeDashoffset: getProgress(props.status)}}
            ></circle>
          </svg>
        </div>
        <div className="actions">
          <img
            className="edit"
            src="../src/assets/edit.png"
            alt="edit"
            onClick={props.onEdit}
          />
          <img src="../src/assets/delete.png" alt="delete" onClick={props.onDelete}/>
        </div>
      </div>
    </>
  );
}
