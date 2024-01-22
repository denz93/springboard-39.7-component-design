import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = .25, isSureToSolvable = false }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let r = 0; r < nrows; r++) {
      let row = [];
      for (let c = 0; c < ncols; c++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    isSureToSolvable && makeSureSolvable(initialBoard);

    return initialBoard;
  }

  /**
   * 
   * @param {boolean[][]} board 
   */
  function makeSureSolvable(board) {
    board.forEach(row => {
      row.forEach((_, idx) => { row[idx] = false })
    })
    for (let i = 0; i < 20; i++) {
      let y = Math.floor(Math.random() * nrows);
      let x = Math.floor(Math.random() * ncols);
      flipCell(y, x, board)
      flipCell(y, x - 1, board)
      flipCell(y, x + 1, board)
      flipCell(y - 1, x, board)
      flipCell(y + 1, x, board)
    }
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    for (let r of board) {
      for (let c of r) {
        if (c === true) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCell (y, x, boardCopy) {
    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      boardCopy[y][x] = !boardCopy[y][x];
    }
  };
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);


      // Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);

      // return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div className="Board-title">You Won</div>;
  }

  // make table board

  return <table className="board">
    <tbody>
    {board.map((row, y) =>
      <tr key={y} className="row">
        {row.map((cell, x) =>
          <Cell
            key={`${y}-${x}`}
            isLit={cell}
            flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
          />
        )}
      </tr>
    )}
    </tbody>
  </table>
}

export default Board;
