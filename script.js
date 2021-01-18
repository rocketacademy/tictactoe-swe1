// Please implement exercise logic here
// keep data about the game in a 2-D array
const MODE = 'DISPLAY RESULTS';

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let messageDiv;
// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

let winningConditions;
let winningCoordinates;

const showMatchMessage = () => {
  messageDiv = document.createElement('h2');
  messageDiv.classList.add('heading');
  messageDiv.innerText = `${currentPlayer} wins !!`;
  return messageDiv;
};

checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions
  if (board[0][0] && board[0][1] && board[0][2]) {
    return true;
  }

  if (board[1][0] && board[1][1] && board[1][2]) {
    return true;
  }

  if (board[2][0] && board[2][1] && board[2][2]) {
    return true;
  }

  if (board[0][0] && board[1][0] && board[2][0]) {
    return true;
  }

  if (board[0][1] && board[1][1] && board[2][1]) {
    return true;
  }

  if (board[0][2] && board[1][2] && board[2][2]) {
    return true;
  }

  if (board[0][0] && board[1][1] && board[2][2]) {
    return true;
  }

  if (board[0][2] && board[1][1] && board[2][0]) {
    return true;
  }
};

const clearBoard = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  winningConditions.remove();
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  if (MODE === 'DISPLAY RESULTS') {
  // see if the clicked square has been clicked on before
    if (board[column][row] === '') {
      console.log('board[column][row]');
      console.log([column], [row]);
      // // alter the data array, set it to the current player
      board[column][row] = currentPlayer;

      if (checkWin(board) === true) {
        winningConditions = showMatchMessage();
        document.body.append(winningConditions);
        console.log('winning', winningConditions);
      }
    }
  }

  // game over

  // refresh the creen with a new board
  // according to the array that was just changed
  buildBoard(board);
  togglePlayer();
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];
      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardElement.appendChild(rowElement);
  }
  boardContainer.appendChild(boardElement);
  return boardContainer;
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  const boardEl = buildBoard(board);
  document.body.appendChild(boardEl);
};

initGame();
