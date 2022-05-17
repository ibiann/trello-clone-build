import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { isEmpty } from "lodash";
import "./boardcon.scss";
import Column from "../Column/Column";
import { mapOrder } from "../../util/sort";
import { applyDrag } from "../../util/dragDrop";

import { initialData } from "../../actions/initialData";
import AddIcon from "@mui/icons-material/Add";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

function BoardCon() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewListForm, setOpenNewListForm] = useState(false);

  const newListInputRef = useRef(null);

  const [newListTitle, setNewListTitle] = useState("");

  const onNewListTitleChange = useCallback(
    (e) => setNewListTitle(e.target.value),
    []
  );

  useEffect(() => {
    const boardDB = initialData.boards.find((board) => board.id === "board-1");
    if (boardDB) {
      setBoard(boardDB);

      //sort columns
      boardDB.columns.sort((a, b) => {
        return (
          boardDB.columnOrder.indexOf(a.id) - boardDB.columnOrder.indexOf(b.id)
        );
      });
      setColumns(mapOrder(boardDB.columns, boardDB.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newListInputRef && newListInputRef.current) {
      newListInputRef.current.focus();
      newListInputRef.current.select();
    }
  }, [openNewListForm]);

  if (isEmpty(board)) {
    return <div className="not-found">404</div>;
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);
      // console.log(newColumns);
      setColumns(newColumns);
    }
  };

  const toggleOpenNewListForm = () => setOpenNewListForm(!openNewListForm);

  const addNewList = () => {
    if (!newListTitle) {
      newListInputRef.current.focus();
      return;
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      name: board.name,
      background: [],
      boardId: board.id,
      title: newListTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
    setNewListTitle("");
    toggleOpenNewListForm("");
  };

  return (
    <div className="app-column-board">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-view",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="kanban-b4-container">
        {!openNewListForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewListForm}>
              <AddIcon className="mui-icon" /> Add another list
            </Col>
          </Row>
        )}
        {openNewListForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                className="input-box"
                size="sm"
                type="text"
                placeholder="Add text..."
                ref={newListInputRef}
                value={newListTitle}
                onChange={onNewListTitleChange}
                onKeyDown={(e) => e.key === "Enter" && addNewList()}
              />
              <Button variant="outline-success" size="sm" onClick={addNewList}>
                Add list
              </Button>
              <span
                className="cancel-adding-new-column-icon"
                onClick={toggleOpenNewListForm}
              >
                <CancelPresentationIcon className="mui-close-cancel"/>
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

export default BoardCon;
