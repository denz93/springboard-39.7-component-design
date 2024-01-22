import React from "react";
import "./Cell.css";
import lightOn from './light-on.png';
import lightOff from './light-off.png';

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;

  return <td className={classes} onClick={flipCellsAroundMe} >
    <img src={isLit ? lightOn : lightOff} alt={isLit ? "light on" : "light off"} width={64} height={64}/>
  </td>;
}

export default Cell;
