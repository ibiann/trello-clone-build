import React from "react";
import "./card.scss";

function Card(props) {
  const { card } = props;
  return (
    <li className="card-items">
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.title}
    </li>
  );
}

export default Card;
