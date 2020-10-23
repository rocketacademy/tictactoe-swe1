//= ========================Global Variables=========================//
// Set boardSize for TTT
const boardSize = 3;

// keep data about the game in a 2-D array
const board = [];
// a matrix used for checking matches horizontally
const posMatrix = [];

// the element that contains the rows and squares
let boardElement;
let gameResultDisplay1;
let gameResultDisplay2;
let gameResultDisplay3;
let gameResultDisplay4;
let outputValue;
let outputValue2 = 'There is no winner';

let currentPlayer = 'X';
// the element that contains the entire board
// we can empty it out for convenience
const boardContainer = document.createElement('div');

// Global variables to manage co-ordinates tracking for matching purposes
const x = boardSize - 1;
const y = boardSize - 1;
// starting co-ordinate used for checking diagonally i.e posMatrix[z][z]
let z = 0;

//= ========================Helper Functions=========================//

// Used to create an initial position Matrix for checking for matches horizontally
const createPosMatrix = () => {
  for (let i = 0; i < boardSize; i += 1) {
    posMatrix.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      // output a matrix that labels each square with a unique number for checking later
      posMatrix[i][j] = `${i * boardSize + j}`;
    }
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = () => {
  // start with an empty container

  //   boardContainer.innerHTML = "";
  board.length = 0;
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  gameResultDisplay1 = document.createElement('div');
  gameResultDisplay2 = document.createElement('div');
  gameResultDisplay3 = document.createElement('div');
  gameResultDisplay4 = document.createElement('div');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    // set each square
    // j is the column number
    for (let j = 0; j < boardSize; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
        square.innerText = posMatrix[i][j];

        // Check Horizontally
        resetCoordinates();
        checkWinXY(x, y, 'horizontal');
        gameResultDisplay1.innerText = `Checked horizontally: ${outputValue}`;

        // Check Vertically
        resetCoordinates();
        checkWinXY(x, y, 'vertical');
        gameResultDisplay2.innerText = `Checked vertically: ${outputValue}`;

        // Check Diagonally Left
        resetCoordinates();
        checkWinZ(x, y, 'left');
        gameResultDisplay3.innerText = `Check top-right to bottom-left diagonally: ${outputValue2}`;

        // // Check Diagonally Right
        resetCoordinates();
        checkWinZ(x, y, 'right');
        gameResultDisplay4.innerText = `Check top-left to bottom-right diagonally: ${outputValue2}`;
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
    document.body.appendChild(gameResultDisplay1);
    document.body.appendChild(gameResultDisplay2);
    document.body.appendChild(gameResultDisplay3);
    document.body.appendChild(gameResultDisplay4);
  }
};

// create the board container element and put it on the screen
const gameInit = () => {
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  // createPositionMatrix and createInversePositionMatrix
  createPosMatrix();
  buildBoard();
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (row, column) => {
  // see if the clicked square has been clicked on before
  if (posMatrix[row][column] !== 'X' || posMatrix[row][column] !== 'O') {
    // alter the data array, set it to the current player
    posMatrix[row][column] = currentPlayer;
    togglePlayer();
  }
};

// Fn to check for winners vertically or horizontally
// Input 'horizontal' or  'vertical' to check for matches
// x and y are global variables which hold the global co-ordinates
// note that X refers to the ROW and Y refers to the COLUMN in horizontal mode
const checkWinXY = (x, y, direction) => {
  // Attempt to swap X and Y to check vertically by using intermediate variables
  let a;
  let b;
  let c;
  let d;
  let e;
  let f;

  if (direction === 'horizontal') {
    a = x;
    b = y;
    c = x;
    d = y - 1;
    e = x;
    f = y;
  } else if (direction === 'vertical') {
    a = x;
    b = y;
    c = x - 1;
    d = y;
    e = y;
    f = x;
  }

  // We begin the horizontal and vertical checks from the last co-ordinate (bottom right)
  // if it is equal to the box on its immediate left
  // Comments are written for the case of checking horizontally
  // Scenario 1: if the bottom 2 right boxes are not the same,
  // go up 1 row and re-evaluate the 2 right most boxes
  if (posMatrix[a][b] !== posMatrix[c][d] && x >= 0) {
    // In the event we reached the last row where x is 0
    if (e === 0) {
      // As long as right pointer is not pointing at the 2nd last box
      // Continue to check the same row's for matches, starting from the 2 right most boxes
      if (posMatrix[a][b] !== posMatrix[c][d] && y >= 0) {
        // BASE CASE: Once we reached the top left 2 boxes where y === 1
        // implicitly there is no match and hence no winner
        if (f === 1) {
          outputValue = 'There is no winner';
          return outputValue;
        }
        // Otherwise where y > 1, shift the pointer 1 box to the left and check for matches
        if (direction === 'horizontal') {
          y -= 1;
        } else {
          x -= 1;
        }
        checkWinXY(x, y, direction);
      }
      // Otherwise, go up one row and start from the most right position and check for matches
    } else {
      if (direction === 'horizontal') {
        x -= 1;
        y = boardSize - 1;
      } else {
        y -= 1;
        x = boardSize - 1;
      }
      checkWinXY(x, y, direction);
    }

    // Scenario 2, if 2 consecutive boxes match (regardless of where in the row)
  } else if (posMatrix[a][b] === posMatrix[c][d] && y >= 1) {
    // And if the 2 left most boxes are being compared,
    // implicitly means that the whole row is matched - hence the winner
    if (f === 1) {
      console.log(`Player ${posMatrix[c][d]} has won!`);
      outputValue = `Player ${posMatrix[c][d]} has won!`;
      return outputValue;
    } // Otherwise, shift the pointer 1 left
    // and check for matches for the next consecutive 2 box
    if (direction === 'horizontal') {
      y -= 1;
    } else {
      x -= 1;
    }
    // include some count here to make sure
    checkWinXY(x, y, direction);
  }
};

const checkWinZ = (x, y, bottomSide) => {
  // using X and Y at initialization implies starting to check from the bottom right hand corner
  if (bottomSide === 'right') {
    if (posMatrix[x][y] === posMatrix[x - 1][y - 1] && x >= 1 && y >= 1) {
      if (x === 1 && y === 1) {
        outputValue2 = 'There is a match!';
        return outputValue2;
      }
      x -= 1;
      y -= 1;

      checkWinZ(x, y, bottomSide);
    }
    // Start matching from the left
  } else if (bottomSide === 'left') {
    if (posMatrix[x][z] === posMatrix[x - 1][z + 1]) {
      if (x >= 0 && z <= 2) {
        if (x === 1 && z === boardSize - 2) {
          console.log('step3');
          outputValue2 = 'There is a match!';
          return outputValue2;
        }
        x -= 1;
        z += 1;
        checkWinZ(x, z, bottomSide);
        console.log('here');
      }
    }
  } else {
    console.log('fail');

    outputValue2 = 'There is no match';
    return outputValue2;
  }
};

const resetCoordinates = () => {
  // i = boardSize - 1;
  // j = boardSize - 1;
  z = 0;
};

// EXECUTE GAME BELOW:
gameInit();
