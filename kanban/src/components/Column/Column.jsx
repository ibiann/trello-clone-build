import React, { useCallback, useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";
import "./column.scss";
import Card from "../Card/Card";
import Remove from "../Dialogue/Remove";
import { mapOrder } from "../../util/sort";
import { MODAL_CONFIRM } from "../../util/const";
import {
  selectAllTextField,
  useKeyBoardToSaveTitle,
} from "../../util/contentEditable";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

function Column(props) {
  const { column, onCardDrop, onUpdateList } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const toggleShowConfirmRemove = () =>
    setShowConfirmRemove(!showConfirmRemove);

  const [listTitle, setListTitle] = useState("");
  const handleListTitleChange = useCallback(
    (e) => setListTitle(e.target.value),
    []
  );

  useEffect(() => {
    setListTitle(column.title);
  }, [column.title]);

  const onRemoveAction = (type) => {
    if (type === MODAL_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateList(newColumn);
    }
    toggleShowConfirmRemove();
  };

  const handleTitleBlur = () => {
    console.log(listTitle);
    const newColumn = {
      ...column,
      title: listTitle,
    };
    onUpdateList(newColumn);
  };

  return (
    <div className="columns">
      <header className="column-drag-handle">
        <div className="column-list-title">
          <Form.Control
            size="sm"
            type="text"
            value={listTitle}
            className="list-name-editable"
            onClick={selectAllTextField}
            onChange={handleListTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={useKeyBoardToSaveTitle}
            onMouseDown={(e) => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="dropdown-actions-list">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            >
              <MenuIcon className="dropwdown-menu-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Add Card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmRemove}>
                Remove
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Move Cards</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          //react-dnd
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
      <Remove
        show={showConfirmRemove}
        onAction={onRemoveAction}
        title="Remove Column"
        content={`bruh ${column.title} bruh`}
      />
    </div>
  );
}

export default Column;
