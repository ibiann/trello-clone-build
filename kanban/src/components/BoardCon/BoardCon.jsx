import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";
import "./boardcon.scss";
import Column from "../Column/Column";
import { mapOrder } from "../../util/sort";

import { initialData } from "../../actions/initialData";

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
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

export default BoardCon;
