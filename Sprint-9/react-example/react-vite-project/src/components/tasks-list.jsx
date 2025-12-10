import React from "react";
import TaskItem from "./task-item";
/*
const props = {
    tasksList: [],
    onDeleteTask: () => {},
    onDeleteAllItems: () => {}
}

const { tasksList, onDeleteTask, onDeleteAllItems } = props;
*/

const TasksList = ({ tasksList, onDeleteTask, onDeleteAllItems, onEditTask, editingTask,setEditingTask }) => {
  return (
    <>
      <ul className="task-list">
        {tasksList.map((task, index) => (
          <TaskItem
            key={index}
            onDeleteTask={onDeleteTask}
            taskItem = {{task, index}}
            onEditTask={onEditTask}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        ))}
      </ul>
      <button className="btn btn-warning" onClick={onDeleteAllItems}>
        Delete all tasks
      </button>
    </>
  );
};

/**
  const taskItem = {
    task: task,
    index : index
}
 */

export default TasksList;

/**
 class TasksList {
    constructor(tasksList, deleteTask, deleteAllItems) {
        this.tasksList = tasksList;
        this.onDeleteTask = deleteTask;
        this.onDeleteAllItems = deleteAllItems;
 } 

 const newTaskList = new TaskList(tasksList, deleteTask, deleteAllItems);
 
 */