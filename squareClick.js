// // CHECK FOR WIN
const checkWin = (currentPlayer) => {
  // WINNING COMBINATIONS
  const winningCombinations = [
    [board[0][0], board[0][1], board[0][2]], // top row
    [board[1][0], board[1][1], board[1][2]], // middle row
    [board[2][0], board[2][1], board[2][2]], // bottom row
    [board[0][0], board[1][0], board[2][0]], // left column
    [board[0][1], board[1][1], board[2][1]], // middle column
    [board[0][2], board[1][2], board[2][2]], // right column
    [board[0][0], board[1][1], board[2][2]], // left diagonal
    [board[0][2], board[1][1], board[2][0]], // right diagonal
  ];

  // CHECKING THE COMBINATION ARRAY (COMBINATION) AND CHECKING IF EACH IN EACH ARRAY,
  // ELEMENTS (ELEMENTS) === currentPlayer
  return winningCombinations.some((combination) => {
    console.log("combinations ", combination);
    return combination.every((element) => {
      console.log("i", element);
      return element === currentPlayer;
    });
  });
};

// CHECK DRAW !!! NOT COMPLETED \\ COME BACK TO THIS WHEN I HAVE TIME
const checkDraw = (currentPlayer) => {
  return board.some((b) => {
    console.log(b);
    return b.every((element) => {
      console.log("CHECKDRAW ELEMENT ---> ", element);
      return element != "";
    });
  });
};

const squareClick = (column, row) => {
  console.log("CHECK DRAW FUNCTION --> ", checkDraw(currentPlayer));
  // console.log("coordinates", column, row);
  // console.log("BOARD squareClick", board);

  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    console.log("CHECKWIN FUNCTUON --->> ", checkWin(currentPlayer));
    if (checkWin(currentPlayer) === true) {
      console.log("CHECK WIN TRUE");

      // game over
      const winnerMessage = document.querySelector(".winner-message");

      winnerMessage.innerText = `CONGRATULATIONS!!! Player ${currentPlayer} won!`;

      // location.reload();
      setTimeout(() => {
        location.reload();
      }, 3000);
      console.log("YUP WON");

      // !!! NOT COMPLETED \\ COME BACK TO THIS WHEN I HAVE TIME
    } else if (checkDraw(currentPlayer) === true) {
      const drawMessage = document.querySelector(".draw-message");
      drawMessage.innerText = `OOPS!! Looks like a draw!!`;
      console.log("DRAW%%%%%%");
    }
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    // console.log("BOARD FROM SQUARECLICK", board);

    // change the player
    togglePlayer();
  }
};
