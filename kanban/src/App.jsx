import React from "react";
import "./App.scss";
import AppBar from "./components/AppBar/AppBar";
import AppBoard from "./components/AppBoard/AppBoard";
import BoardCon from "./components/BoardCon/BoardCon";

function App() {
  return (
    <div className="kanban-clone">
      <AppBar />
      <AppBoard />
      <BoardCon />
    </div>
  );
}

export default App;
