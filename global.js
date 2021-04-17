// keep data about the game in a 2-D array
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = "X";

const root = document.getElementById("root");
