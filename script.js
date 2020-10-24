//= ========================Global Variables=========================//
// Set boardSize for TTT
const boardSize = 3
;

// keep data about the game in a 2-D array
const board = [];
// a matrix used for checking matches horizontally
const posMatrix = [];

// the element that contains the rows and squares
let boardElement;

// Track who is the winning player
const gameWon = false;
let winnerName;

// Global variables for various displays and outputValues
let gameResultDisplay1;
let gameResultDisplay2;
let gameResultDisplay3;
let gameResultDisplay4;

let outputValue1 = 'There is no winner';
let outputValue2 = 'There is no winner';
let outputValue3 = 'There is no winner';

// Global var for taking in specified numOfSquares to win
let userInput;
let submitButton;
let userInputDisplay;
let numOfSquares = 3;

let currentPlayer = 'X';
// the element that contains the entire board
// we can empty it out for convenience
const boardContainer = document.createElement('div');

// Global variables to manage co-ordinates tracking for matching purposes
// x and y are also the 'origins' of the match-checking(horizontal + vertical)
// x and y are also the 'origins' of checking from bottom-right to top left
const x = boardSize - 1;
const y = boardSize - 1;
// Variable Z is a starting co-ordinate used for used for traversing columns when checking diagonally (instead of y from bot-left to top-right );
let z = 0;

// New global variables to track possible origins where numOfSquares < boardSize

const oX = boardSize;
const oY = boardSize;
const oZ = boardSize;

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

        // // Check Horizontally
        // resetCoordinates();
        // trackAnchorPoints(x,y,'horizontal');
        // checkWinXY(x, y, 'horizontal',boardSize);
        // gameResultDisplay1.innerText = `Checked horizontally: ${outputValue1}`;

        // // Check Vertically
        // resetCoordinates();
        // trackAnchorPoints(x,y,'vertical');
        // checkWinXY(x, y, 'vertical',boardSize);
        // gameResultDisplay2.innerText = `Checked vertically: ${outputValue1}`;

        // // Check Diagonally Left
        // checkWinZ(x, y, z ,'diagonal-left',boardSize);
        // gameResultDisplay3.innerText = `Check top-right to bottom-left diagonally: ${outputValue3}`;

        // // Check Diagonally Right
        // checkWinZ(x, y, z ,'diagonal-right',boardSize);
        // gameResultDisplay4.innerText = `Check top-left to bottom-right diagonally: ${outputValue2}`;

        // Test
        checkVarWinXY();
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

// create fn that takes in user input + validation
const createUserInput = () => {
  userInput = document.createElement('input');
  userInput.setAttribute('id', 'input');
  userInput.setAttribute('placeholder', 'Please enter number of squares in a row that makes a win.');

  userInputDisplay = document.createElement('div');

  submitButton = document.createElement('button');
  submitButton.innerHTML = 'Submit';
  submitButton.setAttribute('id', 'button');
  submitButton.addEventListener('click', () => {
    const input = document.querySelector('#input');
    if (isNaN(input.value)) {
      console.log('test');
      userInputDisplay.innerHTML = 'Please enter a valid number';
    } else {
      userInputDisplay.innerHTML = `User chose ${input.value} consecutive squares as winning criteria.`;
      numOfSquares = Number(input.value);
    }
  });

  document.body.appendChild(userInput);
  document.body.appendChild(submitButton);
  document.body.appendChild(userInputDisplay);
};

// create the board container element and put it on the screen
const gameInit = () => {
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  // createPositionMatrix for tracking coordinates
  createPosMatrix();
  buildBoard();
  createUserInput();
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};
// Note: variables are 0 indexed
let initialRow;
let initialCol;

const squareClick = (row, column) => {
  // see if the clicked square has been clicked on before
  if (posMatrix[row][column] !== 'X' || posMatrix[row][column] !== 'O') {
    // alter the data array, set it to the current player
    posMatrix[row][column] = currentPlayer;
    togglePlayer();
  }
};
// Fn to reset all global co-ordinates to the (assigned) initial origin(anchor) co-ordinates
const resetCoordinates = () => {
  initialRow = '';
  initialCol = '';
  z = 0;
};
// Fn to track every possible anchorpoints for each run of checkWinXY and checkWinZ
const trackAnchorPoints = (oX, oY, direction) => {
  if (direction === 'horizontal') {
    initialRow = oX;
    initialCol = oY;
  } else if (direction === 'vertical') { // swap the anchor points
    initialRow = oY;
    initialCol = oX;
  } else if (direction === 'left-right') {
    initialRow = oX;
    initialCol = oY;
  } else if (direction === 'right-left') {
    z = oY - (numOfSquares - 1);
    console.log('z is reset');
  }
};
// Fn to check for winners vertically or horizontally
// Input 'horizontal' or  'vertical' to check for matches
// x and y are global variables which hold the global co-ordinates
// note that X refers to the ROW and Y refers to the COLUMN in horizontal mode
const checkWinXY = (x, y, direction, size) => {
  // Swap X and Y to check vertically by using intermediate variables
  let a;
  let b;
  let c;
  let d;

  if (direction === 'horizontal') {
    a = x;
    b = y - 1;
    c = x;
    d = y;
  } else if (direction === 'vertical') {
    a = x - 1;
    b = y;
    c = y;
    d = x;
  }
  // We begin the horizontal and vertical checks from the last co-ordinate (bottom right)
  // if it is equal to the box on its immediate left
  // Comments are written for the case of checking horizontally
  // Scenario 1: if the bottom 2 right boxes are not the same,
  // go up 1 row and re-evaluate the 2 right most boxes

  if (posMatrix[x][y] !== posMatrix[a][b] && c >= initialRow - (size - 1)) {
    // In the event we reached the last row where x is 0
    if (c === initialRow - (size - 1)) { // c === 0
      // As long as right pointer is not pointing at the 2nd last box
      // Continue to check the same row's for matches, starting from the 2 right most boxes
      // BASE CASE: Once we reached the top left 2 boxes where y === 1
      // implicitly there is no match and hence no winner
      if (d === initialRow - (size - 2)) { // d===1
        console.log('no winner');
        outputValue1 = 'There is no winner';
        return outputValue1;
      }
      // Otherwise where y > 1, shift the pointer 1 box to the left and check for matches
      if (direction === 'horizontal') {
        y -= 1;
      } else {
        x -= 1;
      }
      checkWinXY(x, y, direction, size);
      // Otherwise, go up one row and start from the most right position and check for matches
    } else {
      if (direction === 'horizontal') {
        x -= 1;
        y = size - 1;
      } else {
        y -= 1;
        x = size - 1;
      }
      checkWinXY(x, y, direction, size);
    }

    // Scenario 2, if 2 consecutive boxes match (regardless of where in the row)
  } else if (posMatrix[x][y] === posMatrix[a][b] && d >= initialCol - (size - 2)) {
    // And if the 2 left most boxes are being compared,
    // implicitly means that the whole row is matched - hence the winner
    if (d === initialCol - (size - 2)) { // d === 1
      console.log(`Player ${posMatrix[a][b]} has won!`);
      outputValue1 = `Player ${posMatrix[a][b]} has won!`;
      return outputValue1;
    } // Otherwise, shift the pointer 1 left
    // and check for matches for the next consecutive 2 box
    if (direction === 'horizontal') {
      y -= 1;
    } else {
      x -= 1;
    }
    // include some count here to make sure
    checkWinXY(x, y, direction, size);
  }
};

const checkWinZ = (x, y, z, direction, size) => {
  // using X and Y at initialization implies starting to check from the bottom right hand corner

  if (direction === 'left-right') {
    if (posMatrix[x][y] === posMatrix[x - 1][y - 1]) {
      if (x === initialRow - (size - 2) && y === initialCol - (size - 2)) { // (x === 1 && y === 1)
        console.log(`Player ${posMatrix[x][y]} has won!`);
        outputValue2 = `Player ${posMatrix[x][y]} has won!`;
        return outputValue2;
      }
      x -= 1;
      y -= 1;

      checkWinZ(x, y, z, direction, size);
    }
    // Start matching from the left
  } else if (direction === 'right-left') {
    if (posMatrix[x][z] === posMatrix[x - 1][z + 1]) {
      console.log(posMatrix[x][z]);
      console.log(posMatrix[x - 1][z - 1]);
      if (x === initialRow - (size - 2) && z === (size - 2)) { // x === 1 & z === 1
        console.log(`Player ${posMatrix[x][z]} has won!`);
        outputValue3 = `Player ${posMatrix[x][z]} has won!`;
        return outputValue3;
      }
      x -= 1;
      z += 1;
      checkWinZ(x, y, z, direction, size);
      console.log('here');
    } else {
      console.log('No winner');
      // 2 different outputvalues are required so that it does not conflict
      outputValue2 = 'There is no match';
      outputValue3 = 'There is no match';
    }
  }
};

// To generate a permutation of places for numOfCards in a larger than 3x3 permutation grid to check for matches
const createOriginPoints = () => {
// anchorPts store the origins for variable numOfSquare game
  // columns and rows are zero-indexed
  const rightAnchorPts = [];
  // To add another anchorPt in the array, increment by 1
  let i = 0;

  // oX refers to rows
  // oY refers to column
  // using oX instead of generic variable document the draw linkage to the oX global variable

  for (let oX = boardSize; oX - numOfSquares >= 0; oX -= 1) {
    for (let oY = boardSize; oY - numOfSquares >= 0; oY -= 1) {
      rightAnchorPts.push({});
      rightAnchorPts[i].point = i + 1;
      rightAnchorPts[i].column = oX - 1;
      rightAnchorPts[i].row = oY - 1;
      i += 1;
    }
  }
  return rightAnchorPts;
};

const checkVarWinXY = () => {
// Create the initial set of anchor points
  const rightAnchorPts = createOriginPoints();
  console.log(rightAnchorPts);

  // Go through each of the possible right anchor points and check for matches in XY direction
  for (let i = 0; i < rightAnchorPts.length; i += 1) {
    const x = rightAnchorPts[i].row;
    const y = rightAnchorPts[i].column;
    z = y - (numOfSquares - 1); // column - (size-1) [numOfSquares is already 0 indexed];

    // //Check Horizontally
    // resetCoordinates();
    // trackAnchorPoints(x,y,'horizontal');
    // checkWinXY(x, y,'horizontal',numOfSquares );

    // // Check Vertically
    // resetCoordinates();
    // trackAnchorPoints(x,y,'vertical');
    // checkWinXY(x,y,'vertical',numOfSquares );

    // //Check Diagonally --Note z is still
    // trackAnchorPoints(x,y,'left-right');
    // checkWinZ(x,y,z,'left-right',numOfSquares );

    // trackAnchorPoints helps to reassign the value of Z to the appropriate one
    trackAnchorPoints(x, y, 'right-left');

    checkWinZ(x, y, z, 'right-left', numOfSquares);
  }
};

// const checkVarWinZ =() =>{

// }

//= ========================EXECUTE GAME=========================//
gameInit();

// Pattern To Understand for match checking in different sizes
// NumOfCards (size) level  diff
// 3                  1     2
// 4                  2     2
// 5                  3     2
// 6                  4     2
// This is same for both rows and columns
// hence initialRow or initialColumn - (size - 2)
