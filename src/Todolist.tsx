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

  const [taskTitle, setTaskTitle] = React.useState("");
  console.log(taskTitle);

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
  const addNewTaskHandler = () => {
    addTask(taskTitle);
    setTaskTitle("");
  };
  const maxTitleLength = 15;
  const isAddTaskPssible =
    taskTitle.length && taskTitle.length <= maxTitleLength;

  return (
    <div>
      <div className="todolist">
        <TodolistHeader title={title} />
        <div>
          <input
            value={taskTitle}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                taskTitle.length &&
                taskTitle.length < 15
              ) {
                addNewTaskHandler();
              }
            }}
            onChange={(e) => {
              setTaskTitle(e.currentTarget.value);
            }}
          />
          <Button
            title="+"
            onClickHandler={addNewTaskHandler}
            isDisabled={!isAddTaskPssible}
          />
          {!taskTitle.length && <div>Please enter task</div>}
          {taskTitle.length > maxTitleLength && (
            <div>taskTitle is too long</div>
          )}
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
