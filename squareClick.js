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

  //   // check every position
  //   const topRow = board[0].join("");
  //   console.log("BOARD CHECK", typeof topRow);
  //   console.log(topRow);
  //   const l = "xxx";
  //   // console.log(l);

  //   // there is a conditional for all 15 win conditions
  //   // if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
  //   if (
  //     board[0][0] === currentPlayer &&
  //     board[0][1] === currentPlayer &&
  //     board[0][2] === currentPlayer
  //   ) {
  //     console.log("HORIZONTAL TOP MATCH");
  //     // XXX
  //     return true;
  //   }
  //   if (
  //     board[1][0] === currentPlayer &&
  //     board[1][1] === currentPlayer &&
  //     board[1][2] === currentPlayer
  //   ) {
  //     console.log(
  //       "HORIZONTAL MIDDLE MATCH",
  //       board[1][0],
  //       board[1][1],
  //       board[1][2]
  //     );
  //     // XXX
  //     return true;
  //   }
  //   if (
  //     board[2][0] === currentPlayer &&
  //     board[2][1] === currentPlayer &&
  //     board[2][2] === currentPlayer
  //   ) {
  //     console.log(
  //       "HORIZONTAL BOTTOM MATCH",
  //       board[0][0],
  //       board[0][1],
  //       board[0][2]
  //     );
  //     // XXX
  //     return true;
  //   }

  //   // if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
  //   if (
  //     board[0][0] === currentPlayer &&
  //     board[1][0] === currentPlayer &&
  //     board[2][0] === currentPlayer
  //   ) {
  //     console.log("VERTICAL LEFT MATCH", board);
  //     // X
  //     // X
  //     // X
  //     return true;
  //   }
  //   if (
  //     board[0][1] === currentPlayer &&
  //     board[1][1] === currentPlayer &&
  //     board[2][1] === currentPlayer
  //   ) {
  //     console.log("VERTICAL MIDDLE MATCH", board);
  //     // X
  //     // X
  //     // X
  //     return true;
  //   }

  //   if (
  //     board[0][2] === currentPlayer &&
  //     board[1][2] === currentPlayer &&
  //     board[2][2] === currentPlayer
  //   ) {
  //     console.log("VERTICAL RIGHT MATCH", board);
  //     // X
  //     // X
  //     // X
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
        // location.reload();
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
};
