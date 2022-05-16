import React from "react";
import Card from "../Card/Card";
import { mapOrder } from "../../util/sort";
import "./column.scss";

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');
  return (
    <div className="columns">
      <header>{column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </ul>
      <footer>Add new card</footer>
    </div>
  );
}

export default Column;
