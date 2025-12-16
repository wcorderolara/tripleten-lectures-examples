import { useState } from "react";
import "./App.css";
import TasksList from "./components/tasks-list";
import TaskInput from "./components/task-input";
import EmptyMessage from "./components/empty-message";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [taskInput, setTaskInput] = useState(""); 
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (taskInput.trim() === "") return; // Prevent adding empty tasks
    setTasksList([...tasksList, taskInput.trim()]);
    setTaskInput("");
  }

  const deleteAllItems = () => {
    setTasksList([])
  }

  const deleteTask = (index) => {
    const updatedTasks = tasksList.filter((_, idx) => index !== idx);
    setTasksList(updatedTasks);
  }

  const editTask = (index, newTaskContent) => {
    const updatedTasks = [...tasksList]; // I'm creating a shallow copy of my origian tasksList Array
    updatedTasks[index] = newTaskContent.trim();
    setTasksList(updatedTasks);
    setEditingTask(null);
  }

  return (
    // REACT FRAGMENTS
    <>
      <TaskInput
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        onAddTask={addTask}
      />

      {/* condition ? run true statement : run false statement */}

      {tasksList.length === 0 ? (
        <EmptyMessage 
          message={'No new Notifications! come back later.'}
        />
      ) : (
          <TasksList 
            tasksList={tasksList}
            onDeleteTask={deleteTask}
            onDeleteAllItems={deleteAllItems}
            onEditTask={editTask}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
      )}
    </>
  );
}

export default App;
