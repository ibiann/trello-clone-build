import React from "react";
import "./card.scss";

function Card(props) {
  const { card } = props;
  return (
    <div className="card-items">
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.title}
    </div>
  );
}

export default Card;
