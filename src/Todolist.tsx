import React, { ChangeEvent, useRef, KeyboardEvent, useState } from "react";
import { Button } from "./components/Button";
import { TodolistHeader } from "./components/TodolistHeader";
import { FilterValuesType } from "./App";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
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
  filter,
  addTask,
  removeTask,
  changeTaskStatus,
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
  const [inputError, setInputError] = useState<boolean>(false);

  const tasksList: JSX.Element =
    tasks.length === 0 ? (
      <span>Список пуст</span>
    ) : (
      <ul>
        {tasks.map((task: TaskType) => {
          const removeTaskHandler = () => {
            removeTask(task.id);
          };
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
          };
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeStatusHandler}
              />
              <span className={task.isDone ? "taskDone" : "task"}>
                {task.title}
              </span>
              <Button title="x" onClickHandler={removeTaskHandler} />
            </li>
          );
        })}
      </ul>
    );
  const addNewTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim();
    if (trimmedTaskTitle) {
      addTask(trimmedTaskTitle);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    }
    setTaskTitle("");
  };

  const onKeyDownAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskTitle.length && taskTitle.length < 15) {
      addNewTaskHandler();
    }
  };

  const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(false);
    setTaskTitle(e.currentTarget.value);
  };

  const changeTodolistFilterHandlerCreator = (filter: FilterValuesType) => {
    return () => {
      changeTodolistFilter(filter);
    };
  };

  const maxTitleLength = 15;
  const isAddTaskPossible =
    taskTitle.length && taskTitle.length <= maxTitleLength;

  return (
    <div>
      <div className="todolist">
        <TodolistHeader title={title} />
        <div>
          <input
            className={inputError ? "inputError" : ""}
            type="text"
            placeholder="Enter task"
            value={taskTitle}
            onKeyDown={onKeyDownAddNewTaskHandler}
            onChange={setTaskTitleHandler}
          />
          <Button
            title="+"
            onClickHandler={addNewTaskHandler}
            isDisabled={!isAddTaskPossible}
          />
          {!taskTitle.length && (
            <div style={{ color: inputError ? "red" : "black" }}>
              Please enter task
            </div>
          )}
          {taskTitle.length > maxTitleLength && (
            <div>taskTitle is too long</div>
          )}
        </div>
        {tasksList}
        <div>
          <Button
            classes={filter === "all" ? "btnActive" : ""}
            title="All"
            onClickHandler={changeTodolistFilterHandlerCreator("all")}
          />
          <Button
            classes={filter === "active" ? "btnActive" : ""}
            title="Active"
            onClickHandler={changeTodolistFilterHandlerCreator("active")}
          />
          <Button
            classes={filter === "completed" ? "btnActive" : ""}
            title="Completed"
            onClickHandler={changeTodolistFilterHandlerCreator("completed")}
          />
        </div>
      </div>
    </div>
  );
};
