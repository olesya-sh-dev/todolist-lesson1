import React from "react";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};
export const Todolist = ({ title, tasks }: TodolistPropsType) => {
  return (
    <div>
      <div className="todolist">
        <h3>{title}</h3>
        <div>
          <input />
          <button>+</button>
        </div>
        <ul>
          <li>
            <input type="checkbox" checked={tasks[0].isDone} />
            <span>{tasks[0].title}</span>
          </li>
          <li>
            <input type="checkbox" checked={tasks[1].isDone} />{" "}
            <span>{tasks[1].title}</span>
          </li>
          <li>
            <input type="checkbox" checked={tasks[2].isDone} />{" "}
            <span>{tasks[2].title}</span>
          </li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};
