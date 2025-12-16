import React from "react";

const TaskItem = ({ taskItem, onDeleteTask }) => {
  const { task, index } = taskItem;

  return (
    <li className="task-item">
      <span className="task-text">{task}</span>
      <button className="btn btn-danger" onClick={() => onDeleteTask(index)}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
