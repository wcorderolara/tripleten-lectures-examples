import React, { useState } from "react";

/*
const props = {
    taskItem: {
        task: "",
        index: 0
    },
    onDeleteTask: () => {}
}

const {taskItem, onDeleteTask} = props;

*/

const TaskItem = ({
  taskItem,
  onDeleteTask,
  onEditTask,
  editingTask,
  setEditingTask,
}) => {
  const { task, index } = taskItem;
  const isEditing = editingTask === index;
  const [editedText, setEditedText] = useState(task);

  const handleSave = () => {
    if (editedText.trim() === "") return;
    onEditTask(index, editedText);
  };
  return (
    <>
      <li className="task-item">
        {isEditing ? (
          <>
            <input
              className="edit-input"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
            <button className="btn btn-info" onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <span className="task-text">{task}</span>
            <button
              className="btn btn-info"
              onClick={() => setEditingTask(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteTask(index)}
            >
              Delete
            </button>
          </>
        )}
      </li>
    </>
  );
};

export default TaskItem;
