import React from "react";

const TaskInput = ({taskInput, setTaskInput, onAddTask}) => {
  return (
    <div className="input-group">
      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        type="text"
        placeholder="Enter a new Task..."
      />
      <button className="btn btn-primary" onClick={onAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
