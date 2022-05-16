import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="kanban-clone">
      <nav className="app-navbar top">App bar</nav>
      <nav className="app-navbar board">Board Bar</nav>
      <div className="app-column-board">
        <div className="columns">
          <header>Column-1</header>
          <ul>
            <li>
              <img src="https://picsum.photos/200/200" alt="" />
              Title:
              <strong>Trung</strong>
            </li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
          </ul>
          <footer>Add new card</footer>
        </div>
        <div className="columns">
          <header>Column-1</header>
          <ul>
            <li>
              <img src="https://picsum.photos/200/200" alt="" />
              Title:
              <strong>Trung</strong>
            </li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
          </ul>
          <footer>Add new card</footer>
        </div>
        <div className="columns">
          <header>Column-1</header>
          <ul>
            <li>
              <img src="https://picsum.photos/200/200" alt="" />
              Title:
              <strong>Trung</strong>
            </li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
          </ul>
          <footer>Add new card</footer>
        </div>
      </div>
    </div>
  );
}

export default App;
