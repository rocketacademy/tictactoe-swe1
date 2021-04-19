// Please implement exercise logic here
// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer;
currentPlayer = 'X';

const won = false;

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
    boardContainer.appendChild(rowElement);
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

function displayWinner(winner) {
  const winnerPara = document.createElement('p');
  document.body.appendChild(winnerPara);
  winnerPara.innerText = `${winner} won the game!`;
}

// const checkWin = (board) => {
//   // check every position
//   // there is a conditional for all 15 win conditions

//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board.length; j++) {
//       const cordinates = board[i][j];
//       cordinatesArr.push(cordinates);
//     }
//     if (cordinatesArr[0] === cordinatesArr[1] === cordinatesArr[2]) {
//       return (console.log('match found'));
//     }
//   }
// };

const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions
  if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    displayWinner(currentPlayer);
    return true;
  }

  if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    // X
    // X
    // X
  }
};

function squareClick(column, row) {
  if (board[column][row] === '') {
    board[column][row] = currentPlayer;
    if (checkWin(board) === true) {
      // game over
      console.log('game over');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      togglePlayer();
    }
  }
  buildBoard(board);
}

initGame();
