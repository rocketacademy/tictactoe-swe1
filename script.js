// Global setup ================================================
// delay in millisecs before game resets
const delayInMillisecToResetGame = 2000;

// keep data about the game in a 2-D array
let board = [];
// size of board in length
let boardSize;
// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// container for input box and button for user to submit the board size
let boardSizeContainer;
// input box for user to submit the board size
let boardSizeInputBox;
// button for user to submit the board size
let boardSizeButton;

// current player global starts at X
let currentPlayer = 'X';

// variable to store number of matching symbols needed to meet the winning condition.
let matchesToWin;
// if isWin is true, then there is a winner
let isWin = false;

// Helper functions ===========================================================
// to create elements and containers to display content when browser loads
const initialiseStartingElements = () => {
  // container for the board elements
  boardContainer = document.createElement('div');
  boardContainer.classList.add('board-container');

  // container and elements for player to input board size
  boardSizeContainer = document.createElement('div');
  boardSizeInputBox = document.createElement('input');
  boardSizeInputBox.setAttribute('placeholder', 'board size');
  boardSizeButton = document.createElement('button');
};

// to make an empty board array according to its size
const makeEmptyBoardArray = () => {
  board = [];
  for (let row = 0; row < boardSize; row += 1) {
    // make empty rows
    board.push([]);

    // empty columns
    for (let col = 0; col < boardSize; col += 1) {
      board[row].push('');
    }
  }
};

// get number of matching symbols needed to meet the winning condition.
const getMatchesToWin = () => boardSize - 1;

// to check for winning condition
// returns true if there is a winning condition, else false
const checkWin = () => {
  let row;
  let column;
  let matches = 0;

  // check each row for winning condition
  for (row = 0; row < board.length; row += 1) {
    for (column = 0; column < (board[row].length - 1); column += 1) {
      // if the value of board[row][column] is not empty && === value of the next column
      // add 1 to matchesToWin.
      if (board[row][column] != '' && board[row][column] === board[row][column + 1]) {
        matches += 1;
        console.log(matches);
      }
    }

    // stop checking other rows if the current row has the wining condition
    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to zero to check for next row
      matches = 0;
    }
  }

  // check each column for winning condition
  for (column = 0; column < board.length; column += 1) {
    for (row = 0; row < (board[column].length - 1); row += 1) {
      // if the value of board[row][column] is not empty && === value in the next row
      // add 1 to matchesToWin.
      if (board[row][column] != '' && board[row][column] === board[row + 1][column]) {
        matches += 1;
      }
    }

    // stop checking other columns if the current row has the wining condition
    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to 0 to check for next column
      matches = 0;
    }
  }

  // check diagonally right for winning condition
  for (column = 0; column < (board.length - 1); column += 1) {
    for (row = 0; row < (board[column].length - 1); row += 1) {
      const innerColumn = row;
      // if the value of board[row][innerColumn] is not empty
      // && === value of board[row+1][innerColumn+1]
      // add 1 to matchesToWin.
      if (board[row][innerColumn] != '' && board[row][innerColumn] === board[row + 1][innerColumn + 1]) {
        matches += 1;
      }
    }

    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to 0
      matches = 0;
    }
  }

  // check diagonally left for winning condition
  for (column = (board.length - 1); column > 0; column -= 1) {
    for (row = 0; row < (board[column].length - 1); row += 1) {
      const innerColumn = (board.length - 1 - row);
      // if the value of board[row][innerColumn] is not empty
      // && === value of board[row+1][innerColumn-1]
      // add 1 to matchesToWin.
      if (board[row][innerColumn] != '' && board[row][innerColumn] === board[row + 1][innerColumn - 1]) {
        matches += 1;
        console.log('matches' + matches);
      }
    }

    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to 0
      matches = 0;
    }
  }
  return isWin;
};

// to create element that contains the win message
const createWinMessageElement = () => document.createElement('p');

// to switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// to perform certain actions when a square is clicked
const squareClick = (column, row, buildBoard) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard();

    // check if there is a winner
    if (checkWin() === true) {
      console.log('we have a winner!');
      const winner = currentPlayer;

      // display win message
      const winMessageElement = createWinMessageElement();
      winMessageElement.innerText = `${winner} has won!`;
      document.body.appendChild(winMessageElement);

      // set 2 seconds before resetting the game
      setTimeout(() => {
        // remove win mesage
        winMessageElement.remove();

        // make empty board aray according to its size
        makeEmptyBoardArray();

        // change to other player
        togglePlayer();

        // make winning condition equal false
        isWin = false;

        // refresh the screen with a new board
        // according to the array that was just changed
        buildBoard();
      }, delayInMillisecToResetGame);
    } else {
      // change the player
      togglePlayer();
    }
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = () => {
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
        squareClick(i, j, buildBoard);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);

    // display the board
    document.body.appendChild(boardContainer);
  }
};

// Game Initilization ============================================================
// create the board container element and put it on the screen
const gameInit = () => {
  initialiseStartingElements();

  // when user submits board size they want, create the board
  boardSizeButton.addEventListener('click', () => {
    // get the board size from what the user types into the input box
    boardSize = boardSizeInputBox.value;

    // remove board size container
    boardSizeContainer.remove();

    // make empty board array according to its size
    makeEmptyBoardArray();

    // build the board - right now it's empty
    buildBoard();

    // store number of matching symbols needed to meet the winning condition.
    matchesToWin = getMatchesToWin();
  });

  boardSizeContainer.innerText = 'submit the board size you want: ';
  boardSizeButton.innerText = 'submit';
  boardSizeContainer.appendChild(boardSizeInputBox);
  boardSizeContainer.appendChild(boardSizeButton);

  // append to starting elements to browser body tag
  document.body.appendChild(boardSizeContainer);
};

gameInit();
