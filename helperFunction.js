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
  let checksDoneRow = 0;
  let checksDoneCol = 0;
  let checksDoneDiag1 = 0;
  let checksDoneDiag2 = 0;
  for (i = 0; i < boardSize; i++) {
    if (board[row][i] === currentPlayer) {
      checksDoneCol += 1;
      console.log(checksDoneCol);
    } else {
      checksDoneCol = 0;
      console.log(checksDoneCol);
    }
    if (board[i][column] === currentPlayer) {
      checksDoneRow += 1;
      console.log(checksDoneRow);
    } else {
      checksDoneRow = 0;
      console.log(checksDoneRow);
    }
    if (board[i][i] === currentPlayer) {
      checksDoneDiag1 += 1;
      console.log(checksDoneDiag1);
    } else {
      checksDoneDiag1 = 0;
      console.log(checksDoneDiag1);
    }
    if (board[boardSize - 1 - i][i] === currentPlayer) {
      checksDoneDiag2 += 1;
      console.log(checksDoneDiag2);
    } else {
      checksDoneDiag2 = 0;
      console.log(checksDoneDiag2);
    }
    if (
      checksDoneRow === parseInt(winSquares) ||
      checksDoneCol === parseInt(winSquares) ||
      checksDoneDiag1 === parseInt(winSquares) ||
      checksDoneDiag2 === parseInt(winSquares)
    ) {
      return true;
    }
  }
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
