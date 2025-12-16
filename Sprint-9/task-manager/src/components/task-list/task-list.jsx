import React from "react";
import TaskItem from "../task-item/task-item";

const TaskList = ({ taskList, onDeleteTask, onDeleteAllTasks }) => {
  return (
    <>
      <ul className="task-list">
        {taskList.map((task, index) => (
          <TaskItem
            key={index}
            taskItem={{ task, index }}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
      <button className="btn btn-warning" onClick={onDeleteAllTasks}>
        Delete all tasks
      </button>
    </>
  );
};

export default TaskList;
