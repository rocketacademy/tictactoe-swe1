// Tic-Tac-Toe V1

// Create a board array with x number of cols & rows.
const initBoardArr = (numRows, numCols) => {
  const boardArr = [];
  for (let i = 0; i < numRows; i += 1) {
    boardArr.push([]);
    for (let j = 0; j < numCols; j += 1) {
      boardArr[i].push('');
    }
  }
  return boardArr;
};

// Global Variables.
const boardArr = initBoardArr(3, 3);
let boardElement;
let boardContainer;
let currentPlayer = 'X';

// Check winning for conditons.
const checkWin = (board) => {
  for (let i = 0; i < board.length; i += 1) {
    // Vertical.
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true;
    }

    // Horizontal.
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }

    // Diagonal.
    if ((board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2])
        || (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
      return true;
    }
  }
  return false;
};

// Toggle player (global variable).
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (column, row) => {
  console.log('Coordinates: ', column, row);

  // Check if the clicked square has been clicked on before
  if (boardArr[column][row] === '') {
    boardArr[column][row] = currentPlayer;

    // Refresh the creen with a new board
    buildBoard(boardArr);

    if (checkWin(boardArr) === true) {
      const winMsg = document.createElement('div');
      winMsg.innerHTML = `PLAYER '${currentPlayer}' WON!`;
      winMsg.classList.add('winner');
      document.body.appendChild(winMsg);

      console.log('WINNER: ', currentPlayer);
    } else {
      togglePlayer();
      console.log('Toggle happened');
    }
  }
};

// Rebuilds the entire board every time squareClick() activated.
const buildBoard = (board) => {
  // Start with empty container.
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // Move through the boardArr & create current state of board.
  for (let i = 0; i < board.length; i += 1) {
    // Separate row & row element.
    const row = board[i];
    const rowElement = document.createElement('div');

    // Set each square ('j' represents col number).
    for (let j = 0; j < row.length; j += 1) {
      const squareElement = document.createElement('div');
      squareElement.classList.add('square');

      // Set text of the square according to the boardArray.
      squareElement.innerText = row[j];
      // Append x number of squareElements to each row.
      rowElement.appendChild(squareElement);

      // Set click up all over again.
      // eslint-disable-next-line
      squareElement.addEventListener('click', () => {
        squareClick(i, j);
      });
    }
    // Add a single row to the board.
    boardContainer.appendChild(rowElement);
  }
};

// Create board container element & put it on the screen.
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // Initialise board.
  buildBoard(boardArr);
};

initGame();
