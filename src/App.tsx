import React from "react";

import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";
function App() {
  //BLL:
  const todolistTitle = "What to learn";

  const [tasks, setTasks] = React.useState<TaskType[]>([
    { id: 1, title: "HTML &CSS", isDone: true },
    { id: 2, title: "JS & TS", isDone: true },
    { id: 3, title: "React & Redux", isDone: false },
  ]);

  const [filter, setFilter] = React.useState<FilterValuesType>("active");

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const changeTodolistFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  //UI:
  const getFilteredTasks = (
    allTasks: Array<TaskType>,
    currentFilter: FilterValuesType
  ): Array<TaskType> => {
    switch (currentFilter) {
      case "active":
        return allTasks.filter((t) => t.isDone === false);
      case "completed":
        return allTasks.filter((t) => t.isDone === true);
      default:
        return allTasks;
    }
  };

  const filteredTasks = getFilteredTasks(tasks, filter);

  return (
    <div className="App">
      <Todolist
        title={todolistTitle}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeTodolistFilter={changeTodolistFilter}
      />
      {/* Todolist(
        {title: "What to learn"}
      ) */}
    </div>
  );
}

export default App;
