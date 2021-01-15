// Declare global variables
const boardSize = 3;
const board = [];
// let boardElement; // the element that contains the rows and squares

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
let msgContainer;
let currentPlayer = 'X';
let gameMode = 'play';

// The Big Idea
// 1. The variable 'board' is a 2-dimension array which holds a 'X', 'O', or ''.
// 2. With each click, 'board' is updated (through 'squareClick')
// 3. Which also builds the board again 'buildBoard'
// 4. Your primary task is to create the winning condition
// 5. Nice to haves are Message boards, highlighted winning conditions, win messages

// Function 1: Completely Rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  // boardElement = document.createElement('div');
  // boardElement.classList.add('board');

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
    boardContainer.appendChild(rowElement);
  }
};

// Function 2: create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  msgContainer = document.createElement('div');
  document.body.appendChild(msgContainer);
  document.body.appendChild(boardContainer);

  // create board array
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push('');
    }
  }
  // build the board - right now it's empty
  buildBoard(board);
};

// Function 3: switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// Function 5: Check if the player has won
const checkWin = (playerSymbol) => {
  // There are 3 ways for a player to win:
  // Option 1: Entire row matches
  // Option 2: Entire column matches
  // Option 3: Diagonal line
  let rowMatch = false;
  let colMatch = false;
  let acrossMatch = false;
  const rowCheckArray = [];
  const colCheckArray = [];
  const acrossCheckArray = [];

  // Create array to hold T/F status of columns. true until proven false
  for (let i = 0; i < boardSize; i += 1) {
    colCheckArray.push(true);
    rowCheckArray.push(true);
    if (i < 2) {
      acrossCheckArray.push(true);
    }
  }

  // Check row and columns. If does not match, the row/colum is false (no match)
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (board[i][j] !== playerSymbol) {
        rowCheckArray[i] = false;
        colCheckArray[j] = false;
      }
    }
  }

  // Check diagonals.
  for (let i = 0; i < boardSize; i += 1) {
    if (board[i][i] !== playerSymbol) {
      acrossCheckArray[0] = false;
    }
    for (let j = boardSize - 1; j >= 0; j -= 1) {
      if (board[i][j] !== playerSymbol) {
        acrossCheckArray[1] = false;
      }
    }
  }
  console.log(`==== ${playerSymbol}'s turn ====`);
  console.log('(1) ARRAYS:');
  console.log(`columns: ${colCheckArray}`);
  console.log(`rows: ${rowCheckArray}`);
  console.log(`across: ${acrossCheckArray}`);

  // Update colMatch condition
  for (let i = 0; i < boardSize; i += 1) {
    if (colCheckArray[i] === true) {
      colMatch = true;
      console.log('complete col match');
    }
    if (rowCheckArray[i] === true) {
      rowMatch = true;
      console.log('complete row match');
    }
    if (i < 2 && acrossCheckArray[i] === true) {
      acrossMatch = true;
      console.log('complete diagonal match');
    }
  }

  // Update game mode
  if (rowMatch || colMatch || acrossMatch) {
    console.log(`${playerSymbol} WON!! `);
    gameMode = 'gameEnd';
  }
  console.log('(2) RESULTS:');
  console.log(`Game End? : ${rowMatch}, ${colMatch}, ${acrossMatch}`);
};

// Function 4: What happens when you click a square
const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    checkWin(currentPlayer);

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    togglePlayer();
  }
};

initGame();
