import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <Board ncols={5} nrows={5} chanceLightStartsOn={0} isSureToSolvable={false} />
      </div>
  );
}

export default App;
