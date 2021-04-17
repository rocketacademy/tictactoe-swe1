// GAME INIT FUNCTION
// create the board container element and put it on the screen
const initGame = (board) => {
  // const root = document.getElementById("root");
  boardContainer = document.createElement("div");
  root.appendChild(boardContainer);

  // build the board - right now it's empty

  buildBoard(board);
};
