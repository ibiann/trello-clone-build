import * as React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import "./column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../util/sort";
import AddIcon from "@mui/icons-material/Add";

function Column(props) {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

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
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
      <footer>
        <div className="footer-action-handle">
          <AddIcon className="mui-icon" />
          Add new card
        </div>
      </footer>
    </div>
  );
}

export default Column;
