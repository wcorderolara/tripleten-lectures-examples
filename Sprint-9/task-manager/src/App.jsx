import { useState, useRef } from "react";
import "./App.css";
import TaskList from "./components/task-list/task-list";
import TaskInput from "./components/taskInput/task-input";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const inputRef = useRef(null);

  const addTaskHandler = () => {
    if (taskInput.trim() === "") return;
    setTaskList([...taskList, taskInput.trim()]);
    setTaskInput("");
    inputRef.current?.focus();
  };

  const deleteTaskHandler = (index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
  };

  const deleteAllTasksHandler = () => {
    setTaskList([]);
  };

  return (
    <>
      {/* Input Group */}
      <TaskInput
        taskInput={taskInput}
        inputRef={inputRef}
        setTaskInput={setTaskInput}
        addTaskHandler={addTaskHandler}
      />

      {/* Task List */}

      {taskList.length === 0 ? (
        <p className="no-tasks">No tasks available. Please add a task.</p>
      ) : (
        <>
          <TaskList
            taskList={taskList}
            onDeleteTask={deleteTaskHandler}
            onDeleteAllTasks={deleteAllTasksHandler}
          />
        </>
      )}
    </>
  );
}

export default App;
