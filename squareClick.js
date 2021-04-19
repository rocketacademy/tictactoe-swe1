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
const squareClick = (column, row) => {
  // console.log("coordinates", column, row);
  // console.log("BOARD squareClick", board);

  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
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
    } else {
    }
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    // console.log("BOARD FROM SQUARECLICK", board);

    // change the player
    togglePlayer();
  }
};
