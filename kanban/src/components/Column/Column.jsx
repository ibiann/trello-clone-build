import React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import "./column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../util/sort";

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const onCardDrop = (dropResult) => {
    console.log(dropResult);
  };

  return (
    <div className="columns">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          //react-smooth-dnd library

          // onDragStart={(e) => console.log("drag started", e)}
          // onDragEnd={(e) => console.log("drag end", e)}
          // onDragEnter={() => {
          //   console.log("drag enter:", column.id);
          // }}
          // onDragLeave={() => {
          //   console.log("drag leave:", column.id);
          // }}
          // onDropReady={(p) => console.log("Drop ready: ", p)}
          groupName="col"
          orientation="vertical"
          onDrop={onCardDrop}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-view",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>Add new card</footer>
    </div>
  );
}

export default Column;
