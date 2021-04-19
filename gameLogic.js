// GAME LOGIC
// switch the global values from one player to the next
const togglePlayer = () => {
  console.log("togglePlayer", currentPlayer);
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

// // // CHECK FOR WIN
// const checkWin = (board) => {
//   console.log("THIS IS BOARD FROM CHECKWIN", board);
//   // check every position
//   // there is a conditional for all 15 win conditions
//   if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
//     console.log("HORIZONTAL MATCH", board[0][0], board[0][1], board[0][2]);
//     // XXX
//   }

//   if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
//     console.log("VERTICAL MATCH", board[0][0], board[1][0], board[2][0]);
//     // X
//     // X
//     // X
//   }
// };

// const squareClick = function (column, row) {
//   if (board[column][row] === "") {
//     board[column][row] = currentPlayer;
//     if (checkWin() === true) {
//       // game over
//     } else {
//       togglePlayer();
//     }
//   }
// };
