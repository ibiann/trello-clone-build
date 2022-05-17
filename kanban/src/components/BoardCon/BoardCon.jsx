import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";
import "./boardcon.scss";
import Column from "../Column/Column";
import { mapOrder } from "../../util/sort";
import { applyDrag } from "../../util/dragDrop";

import { initialData } from "../../actions/initialData";
import AddIcon from '@mui/icons-material/Add';

function BoardCon() {
  const [board, setBoard] = useState({});
  // const [currentBoard, setCurrentBoard] = useState({})
  const [columns, setColumns] = useState([]);

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
    console.log(newBoard);

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
      <div className="add-new-column">
        <AddIcon className="mui-icon" /> Add another list
      </div>
    </div>
  );
}

export default BoardCon;
