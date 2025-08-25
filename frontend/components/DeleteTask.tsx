import type { TaskType } from "../src/App";

interface DeleteTaskProps {
  modalOpen: boolean;
  handleClose: () => void;
  onDelete: (_id: string) => void;
  task: TaskType | null;
}

export default function DeleteTask({
  modalOpen,
  handleClose,
  onDelete,
  task,
}: DeleteTaskProps) {
  if (!modalOpen || !task) return null;

  const handleConfirmDelete = () => {
    onDelete(task._id);
    handleClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="add-task">
            <p style={{alignItems:"center", textAlign:"center", fontWeight:700, fontSize:"larger"}}>
              Are you sure you want to delete this task?
            </p>

          <div className="add-task-button" style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleConfirmDelete} style={{ backgroundColor: "#713fff" }}>
              Delete
            </button>
            <button style={{ backgroundColor: "white",color:"gray" }} onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
