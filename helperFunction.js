// Please implement exercise logic here
// keep data about the game in a 2-D array
let boardSize;
let winSquares;
let board = [];
const createBoardCoords = (board) => {
  for (i = 0; i < boardSize; i++) {
    board.push([]);
    for (j = 0; j < boardSize; j++) {
      board[i].push("");
    }
  }
  return board;
};

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = "X";

const checkWin = (board, row, column) => {
  const returnCoords = (coord) => {
    if (coord < 0) {
      const newCoord = +coord + +boardSize;
      return newCoord;
    }
    if (coord === 0) {
      return 0;
    }
    if (coord > boardSize) {
      return +coord - +boardSize;
    } else {
      return coord;
    }
  };
  let checksDoneRow = 0;
  let checksDoneCol = 0;
  let checksDoneDiag1 = 0;
  let checksDoneDiag2 = 0;
  for (i = 1; i < boardSize; i++) {
    if (board[row][returnCoords(column - i)] === currentPlayer) {
      console.log(board[row][returnCoords(column - i)]);
      checksDoneCol += 1;
    } else {
      checksDoneCol = 0;
    }
    if (board[returnCoords(row - i)][column] === currentPlayer) {
      checksDoneRow += 1;
    } else {
      checksDoneRow = 0;
    }
    if (
      board[returnCoords(row - i)][returnCoords(column - i)] === currentPlayer
    ) {
      checksDoneDiag1 += 1;
    } else {
      checksDoneDiag1 = 0;
    }
    if (
      board[returnCoords(row - i)][returnCoords(column + i)] === currentPlayer
    ) {
      checksDoneDiag2 += 1;
    } else {
      checksDoneDiag2 = 0;
    }
    if (
      checksDoneRow === parseInt(winSquares) - 1 ||
      checksDoneCol === parseInt(winSquares) - 1 ||
      checksDoneDiag1 === parseInt(winSquares) - 1 ||
      checksDoneDiag2 === parseInt(winSquares) - 1
    ) {
      return true;
    }
  }
  // const rowCoordinate = board[returnCoords(row - 1)][column];
  // const columnCoordinate = board[row][returnCoords(column - 1)];
  // const diagonalCoordinate1 =
  //   board[returnCoords(row - 1)][returnCoords(column - 1)];
  // const diagonalCoordinate2 =
  //   board[returnCoords(row - 1)][returnCoords(column + 1)];
  // if (
  //   (board[row][returnCoords(column - 2)] === currentPlayer &&
  //     columnCoordinate === currentPlayer) ||
  //   (board[returnCoords(row - 2)][column] === currentPlayer &&
  //     rowCoordinate === currentPlayer) ||
  //   (board[returnCoords(row - 2)][returnCoords(column - 2)] === currentPlayer &&
  //     diagonalCoordinate1 === currentPlayer) ||
  //   (board[returnCoords(row - 2)][returnCoords(column + 2)] === currentPlayer &&
  //     diagonalCoordinate2 === currentPlayer)
  // ) {
  //   return true;
  // }
};
// completely rebuilds the entire board every time there's a click
const squareClick = (row, column) => {
  console.log("coordinates", row, column);

  // see if the clicked square has been clicked on before
  if (board[row][column] === "") {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (checkWin(board, row, column) === true) {
      const gameInfoDisplay = document.getElementById("game-result");
      gameInfoDisplay.innerText = `Player ${currentPlayer} Won!`;
    } else {
      togglePlayer();
    }
  }
};
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};
