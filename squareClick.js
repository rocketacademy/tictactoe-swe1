// // CHECK FOR WIN
const checkWin = (board) => {
  console.log("THIS IS BOARD FROM checkWin", board);
  // check every position
  // there is a conditional for all 15 win conditions
  // if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
  if (
    board[0][0] === currentPlayer &&
    board[0][1] === currentPlayer &&
    board[0][2] === currentPlayer
  ) {
    console.log("HORIZONTAL MATCH", board[0][0], board[0][1], board[0][2]);
    // XXX
    return true;
  }

  // if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
  if (
    board[0][0] === currentPlayer &&
    board[1][0] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    // const theMatch = [board[0][0], board[1][0], board[2][0]];
    // const theBoard = board;
    console.log("VERTICAL MATCH", board);
    // console.log("THE BAORD,", board);
    // X
    // X
    // X
    return true;
  } else {
    return false;
  }
};

const squareClick = (column, row) => {
  // console.log("coordinates", column, row);
  // console.log("BOARD squareClick", board);

  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    if (checkWin(board) === true) {
      console.log("CHECK WIN TRUE");
      console.log(checkWin(board));
      // game over
      location.reload();
    } else {
      // togglePlayer();
    }
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    // console.log("BOARD FROM SQUARECLICK", board);

    // change the player
    togglePlayer();
  }
};

// // ADD THIS
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
