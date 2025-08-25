import React, { Component } from "react";
import type { TaskType } from "../src/App";

interface DeleteTaskProps {
  modalOpen: boolean;
  handleClose: () => void;
  onDelete: (_id: string) => void;
  task: TaskType | null;
}

export default class DeleteTask extends Component<DeleteTaskProps> {
  constructor(props: DeleteTaskProps) {
    super(props);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  handleConfirmDelete() {
    const { onDelete, task, handleClose } = this.props;
    if (task) {
      onDelete(task._id);
      handleClose();
    }
  }

  render() {
    const { modalOpen, handleClose, task } = this.props;

    if (!modalOpen || !task) return null;

    return (
      <div
        className="modal-overlay"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="add-task">
            <p
              style={{
                alignItems: "center",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "larger",
              }}
            >
              Are you sure you want to delete this task?
            </p>

            <div
              className="add-task-button"
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={this.handleConfirmDelete}
                style={{ backgroundColor: "#713fff", color: "white" }}
              >
                Delete
              </button>
              <button
                style={{ backgroundColor: "white", color: "gray" }}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
