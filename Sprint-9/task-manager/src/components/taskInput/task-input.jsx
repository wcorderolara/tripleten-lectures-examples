import React from "react";

const TaskInput = ({ taskInput, inputRef, setTaskInput, addTaskHandler }) => {
  return (
    <div className="input-group">
      <input
        ref={inputRef}
        value={taskInput}
        type="text"
        placeholder="Enter a new Task..."
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addTaskHandler}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
