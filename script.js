// keep data about the game in a 2-D array
const completeBoard = [];
// To store the board size
let inputBoardSize = 0;

// the element that contains the rows and squares
let boardElement = null;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer = null;
// Element to display the game status message
let divDisplayStatus = null;
// Input element for entering the player name
let inputBoardSizeElement = null;

// current player global starts at X
let currentPlayer = 'X';
// A variable to indicate whether game is over or not
let gameOver = false;

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// Function to set the display message
const setDisplayStatus = (message) => {
  divDisplayStatus.innerHTML = message;
};

// Function to check whether the current player has won the game
const checkWin = (board) => {
  let bGameWin = true;
  // Compare with the "across" values i.e. same row, diff cols
  // Comparing by each row
  console.log('Row comparison: ');
  for (let idxRow = 0; idxRow < board.length; idxRow += 1)
  {
    bGameWin = true;
    for (let idxCol = 0; idxCol < board[idxRow].length; idxCol += 1)
    {
      console.log(`board[${idxRow}][${idxCol}] = ${board[idxRow][idxCol]}`);
      // If any value is not same as the expected value, break the inner loop
      if (board[idxRow][idxCol] !== currentPlayer)
      {
        bGameWin = false;
        break;
      }
    }
    // all the value in a row are matching. Return true.
    if (bGameWin)
    {
      return true;
    }
  }

  // Compare vertically i.e. same column, diff rows
  console.log('Column comparison:');
  const numOfCols = board[0].length;
  for (let idxCol = 0; idxCol < numOfCols; idxCol += 1)
  {
    bGameWin = true;
    for (let idxRow = 0; idxRow < board.length; idxRow += 1)
    {
      console.log(`board[${idxRow}][${idxCol}] = ${board[idxRow][idxCol]}`);
      // If any value is not same as the expected value, break the inner loop
      if (board[idxRow][idxCol] !== currentPlayer)
      {
        bGameWin = false;
        break;
      }
    }
    // all the value in a column are matching. Return true.
    if (bGameWin)
    {
      return true;
    }
  }

  // Compare diagonally - from top left to bottom right
  // check only for those sqaures where row === column
  console.log('Diagonal TL to BR: ');
  for (let idxRow = 0; idxRow < board.length; idxRow += 1)
  {
    console.log(`board[${idxRow}][${idxRow}] = ${board[idxRow][idxRow]}`);
    bGameWin = true;
    if (board[idxRow][idxRow] !== currentPlayer)
    {
      bGameWin = false;
      break;
    }
  }
  if (bGameWin)
  {
    return true;
  }
  // Compare diagonally from top-right to bottom-left
  // Here the row index is increased while the column index is decreased
  // Row index starts from the first, while column starts from the last which is length-1
  console.log('Diagonal: TR to BL: ');
  for (let idxRow = 0; idxRow < board.length; idxRow += 1)
  {
    bGameWin = true;
    const idxCol = board[idxRow].length - 1 - idxRow;
    console.log(`board[${idxRow}][${idxCol}] = ${board[idxRow][idxCol]}`);
    if (board[idxRow][idxCol] !== currentPlayer)
    {
      bGameWin = false;
      break;
    }
  }
  return bGameWin;
};

const squareClick = (row, column) => {
  console.log('coordinates', row, column);

  // see if the clicked square has been clicked on before
  if (completeBoard[row][column] === '' && !gameOver) {
    // alter the data array, set it to the current player
    completeBoard[row][column] = currentPlayer;
    // refresh the screen with a new board
    // according to the array that was just changed
    // eslint-disable-next-line no-use-before-define
    buildBoard(completeBoard);
    if (checkWin(completeBoard))
    {
      gameOver = true;
      setDisplayStatus(`Game over. ${currentPlayer} wins!!. Resetting the Game...`);
      setTimeout(() => {
        // eslint disables as resetGame used the function buildBoard
        // eslint-disable-next-line no-use-before-define
        resetGame();
      }, 5000);
      return;
    }
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

// To create a completely new array for board
const createCompleteBoard = (boardSize) => {
  // This is to check whether there is a need to create new array
  // or just need to reset the existing data in it.
  if ((completeBoard.length !== 0) && (completeBoard.length === boardSize)) {
    for (let idxRow = 0; idxRow < completeBoard.length; idxRow += 1)
    {
      for (let idxCol = 0; idxCol < completeBoard.length; idxCol += 1)
      {
        completeBoard[idxRow][idxCol] = '';
      }
    }
    return;
  }
  // An entire new array needs to be created
  completeBoard.length = 0;
  for (let idxRow = 0; idxRow < boardSize; idxRow += 1)
  {
    completeBoard.push([]);
    for (let idxCol = 0; idxCol < boardSize; idxCol += 1)
    {
      completeBoard[idxRow].push('');
    }
  }
};

// Function that resets the game to the intial stage
const resetGame = () => {
  console.log('reset');
  currentPlayer = 'X';
  setDisplayStatus('');
  // recreate the board with existing size
  createCompleteBoard(completeBoard.length);
  buildBoard(completeBoard);
  gameOver = false;
};

// Function to handle the click on the Submit Size button.
// It stores the value of board size and builds the complete board
const onClickSubmitSizeButton = () => {
  inputBoardSize = inputBoardSizeElement.value;
  setDisplayStatus('Board size changed.');
  createCompleteBoard(inputBoardSize);
  // Build the entire board - right now it's empty
  buildBoard(completeBoard);
  gameOver = false;
  // setDisplayStatus('');
};

// Game intialization
const gameInit = () => {
  // Section to handle the inputs received from user any
  const divInputElements = document.createElement('div');
  inputBoardSizeElement = document.createElement('input');
  inputBoardSizeElement.setAttribute('type', 'number');
  inputBoardSizeElement.required = true;
  inputBoardSizeElement.setAttribute('placeholder', 'Enter size of board:');
  inputBoardSizeElement.classList.add('common-margin');
  divInputElements.appendChild(inputBoardSizeElement);
  document.body.appendChild(divInputElements);

  // Button to submit the size
  const inputSizeSubmitButton = document.createElement('button');
  inputSizeSubmitButton.innerText = 'Submit Board Size';
  inputSizeSubmitButton.classList.add('common-margin');
  inputSizeSubmitButton.addEventListener('click', onClickSubmitSizeButton);
  divInputElements.appendChild(inputSizeSubmitButton);

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  divDisplayStatus = document.createElement('div');
  document.body.appendChild(divDisplayStatus);
};

gameInit();
