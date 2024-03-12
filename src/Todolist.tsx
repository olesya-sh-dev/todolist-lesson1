import React, { useRef } from "react";
import { Button } from "./components/Button";
import { TodolistHeader } from "./components/TodolistHeader";
import { FilterValuesType } from "./App";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeTodolistFilter: (filter: FilterValuesType) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export const Todolist = ({
  title,
  tasks,
  addTask,
  removeTask,
  changeTodolistFilter,
}: TodolistPropsType) => {
  const taskTitleInput = React.useRef<HTMLInputElement>(null);

  // let tasksList;
  // if (tasks.length === 0) {
  //   tasksList = <span>Список пуст</span>;
  // } else
  //   tasksList = (
  //     <ul>
  //       {" "}
  //       {tasks.map((task: TaskType) => {
  //         return (
  //           <li key={task.id}>
  //             <input type="checkbox" checked={task.isDone} />
  //             <span>{task.title}</span>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );

  const tasksList: JSX.Element =
    tasks.length === 0 ? (
      <span>Список пуст</span>
    ) : (
      <ul>
        {tasks.map((task: TaskType) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button title="x" onClickHandler={() => removeTask(task.id)} />
            </li>
          );
        })}
      </ul>
    );
  const addNewTask = () => {
    if (taskTitleInput.current) {
      addTask(taskTitleInput.current.value);
      taskTitleInput.current.value = "";
    }
  };
  return (
    <div>
      <div className="todolist">
        <TodolistHeader title={title} />
        <div>
          <input ref={taskTitleInput} />
          <Button title="+" onClickHandler={addNewTask} />
        </div>
        {tasksList}
        <div>
          <Button
            title="All"
            onClickHandler={() => changeTodolistFilter("all")}
          />
          <Button
            title="Active"
            onClickHandler={() => changeTodolistFilter("active")}
          />
          <Button
            title="Completed"
            onClickHandler={() => changeTodolistFilter("completed")}
          />
        </div>
      </div>
    </div>
  );
};
