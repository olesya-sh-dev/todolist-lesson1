import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
function App() {
  //BLL:
  const todolistTitle = "What to learn";

  const [tasks, setTasks] = React.useState<TaskType[]>([
    { id: v1(), title: "HTML &CSS", isDone: true },
    { id: v1(), title: "JS & TS", isDone: true },
    { id: v1(), title: "React & Redux", isDone: false },
  ]);

  const [filter, setFilter] = React.useState<FilterValuesType>("all");
  //CRUD tasks
  const removeTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      //title: title,
      isDone: false,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
  };

  const changeTaskStatus = (taskId: string) => {
    // const task = tasks.find(t => t.id === taskId)
    // if (task){
    //   task.isDone = !task.isDone//мутируем таску
    //   setTasks([...tasks])
    // }
    const updatedState = tasks.map((t) =>
      t.id === taskId ? { ...t, isDone: !t.isDone } : t
    );
    setTasks(updatedState);
  };
  //filter
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
        addTask={addTask}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTodolistFilter={changeTodolistFilter}
      />
    </div>
  );
}

export default App;
