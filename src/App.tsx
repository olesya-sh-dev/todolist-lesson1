import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

function App() {
  const todolistTitle_1 = "What to learn";
  const todolistTitle_2 = "What to buy";

  const task_1: TaskType[] = [
    { id: 1, title: "HTML &CSS", isDone: true },
    { id: 2, title: "JS & TS", isDone: true },
    { id: 3, title: "React & Redux", isDone: false },
  ];

  const task_2: TaskType[] = [
    { id: 4, title: "Water", isDone: false },
    { id: 5, title: "Milk", isDone: true },
    { id: 6, title: "Bread", isDone: true },
  ];

  return (
    <div className="App">
      <Todolist title={todolistTitle_1} tasks={task_1} />
      {/* Todolist(
        {title: "What to learn"}
      ) */}
      <Todolist title={todolistTitle_2} tasks={task_2} />
      {/* Todolist(
        {title: "What to buy"}
      ) */}
    </div>
  );
}

export default App;
