// keep data about the game in a 2-D array
const completeBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement = null;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer = null;

// current player global starts at X
let currentPlayer = 'X';

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (completeBoard[column][row] === '') {
    // alter the data array, set it to the current player
    completeBoard[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    // eslint-disable-next-line no-use-before-define
    buildBoard(completeBoard);

    // change the player
    togglePlayer();
  }
};

// Function to completely rebuild the entire board every time when there's a click
const buildBoard = (board) => {
  // Start with the empty board contained
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1)
  {
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
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }
    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// Game intialization
const gameInit = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // Build the entire board - right now it's empty
  buildBoard(completeBoard);
};

gameInit();
