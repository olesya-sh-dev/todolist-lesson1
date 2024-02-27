import React from "react";
import { Button } from "./Button";

type TodolistHeaderPropsType = {
  title: string;
};
export const TodolistHeader = ({ title }: TodolistHeaderPropsType) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "15px",
      }}
    >
      <h3 style={{ margin: "0" }}>{title}</h3>
      <Button title="X" />
    </div>
  );
};
