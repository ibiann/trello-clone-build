import React from "react";
import Input from "../Input/Input";
import "./column.scss";

function Column() {
  return (
    <div className="columns">
      <header>Column-1</header>
      <ul className="input-list">
        <Input />
        <li className="input-items">a</li>
        <li className="input-items">a</li>
        <li className="input-items">a</li>
        <li className="input-items">a</li>
      </ul>
      <footer>Add new card</footer>
    </div>
  );
}

export default Column;
