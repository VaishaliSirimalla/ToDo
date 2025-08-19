import React from "react";

interface HeaderProps {
  modalOpen: boolean;
  handleOpen: () => void;
}

export default function Header({ modalOpen, handleOpen }: HeaderProps) {
  return (
    <>
      <div className="title">
        <h1>Task List</h1>
        <button onClick={handleOpen}>+ Add Task</button>
      </div>
    </>
  );
}
