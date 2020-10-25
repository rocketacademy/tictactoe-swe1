// ========================Global Variables===============================//

// -------------------------------- General ------------------------------//
// Set boardSize for TTT - can be reassigned by player in-game
let boardSize = 4;

// Track whether game is won or not
let gameWon = false;

// Track who is the winning player
let winner = '';

// Tracks current player, either X or O
let currentPlayer = 'X';

// ------------------- Co-ordinates Tracking & Management----------------//

// Declares a matrix that tracks the positions of available,'X' and 'O' squares
// on the board for matching purposes. Available positions are represented by
// string-numbers
const posMatrix = [];

// To track row and column co-ordinates of 'origin' points for matching purposes
// Consts x and y are the 'origin' points for match-checking in the directions of
// 'horizontal', 'vertical' and diagonally (starting from) 'bot-right' & 'bot-left'
const x = boardSize - 1;
const y = boardSize - 1;

// Var z is the starting column co-ordinate used for
// checking diagonally (starting from) from bot-left to top-right;
// Can be recalculated depending on either 'boardSize' or 'numOfSquaresToWin'
let z = 0;

// Tracks initial anchor-points (origins) for 'numOfSquaresToWin'
// Variables initialRow and initialCol are zero-indexed
let initialRow;
let initialCol;

// -----------------gamePlayMode Configurations---------------------------//
// gamePlayMode tracks whether the game is played in
// 'normal' mode or against 'computer'
let gamePlayMode = 'normal';

// Tracks either 'player' or 'computer' turn in 'computer' gamePlayMode
let playerTurn = 'player';

// Tracks available moves left to determine whether game is over
// in scenario with no winners
let movesLeft;

// ---------------------------HTML Elements ------------------------------//

// Game display div that contains the boardContainer and all other html elements
let gamePage;

// The element that contains the entire board
const boardContainer = document.createElement('div');

// To display miscellaneous messages such as game over, restarting game etc.
// To be accessible across multiple functions such as gameOver() and resetGame()
const outputMessages = document.createElement('div');
outputMessages.innerText = 'Please input number of squares or if blank, play the full board size. \nPlayer X begins first.';

// Display matches, if any for full boardSize game scenario
let gameResultDisplay1;
let gameResultDisplay2;
let gameResultDisplay3;
let gameResultDisplay4;

// Display matches, if any for variable boardSize (aka 'numOfSquaresToWin') game scenario
let gameResultDisplay5;
let gameResultDisplay6;
let gameResultDisplay7;
let gameResultDisplay8;

// Display of the results after checking
// for matches in scenario of fixed BoardSize
let outputValue1 = 'There is no match';
let outputValue2 = 'There is no match';
let outputValue3 = 'There is no match';

// Display of the results after checking
// for matches in scenario of variable 'numOfSquaresToWin'
let outputValue4 = 'There is no match';
let outputValue5 = 'There is no match';
let outputValue6 = 'There is no match';

// Tracks user input on desired 'numOfSquaresToWin' to win
let numSquaresInput;

// Refers to player's discretionary number of squares in a row as
// criteria for game to be won
let numOfSquaresToWin = numSquaresInput;

// Tracks user input on desired board size to play [WIP: buggy]
let boardSizeInput;

let submitNumSquaresBtn;
let submitBoardSizeBtn;
// Toggle between 'normal' mode or 'computer' - play mode;
let changeGamePlayModeBtn;

let numOfSquaresToWinInputDisplay;
let boardSizeInputDisplay;

// ========================Helper Functions=========================//

// Function used to initialise posMatrix and assign numbers
// starting from 0 to (n x n -1) to track empty squares
const initPosMatrix = () => {
  for (let i = 0; i < boardSize; i += 1) {
    posMatrix.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      posMatrix[i][j] = `${i * boardSize + j}`;
    }
  }
};

// Function that switches between 'X' and 'O' after each turn
const togglePlayerSymbol = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// Function that switches between 'computer' and 'player' in 'computer' gamePlayMode
const togglePlayerTurn = () => {
  if (gamePlayMode === 'computer') {
    if (playerTurn === 'player') {
      playerTurn = 'computer';
    } else {
      playerTurn = 'player';
    }
  } else {
    playerTurn = 'player';
  }
};

// Function that creates 'normal' and 'computer' in gamePlayMode
const createGamePlayModeSelection = () => {
  changeGamePlayModeBtn = document.createElement('button');
  changeGamePlayModeBtn.innerText = gamePlayMode;

  // Toggle between 'normal' and 'computer' mode
  changeGamePlayModeBtn.addEventListener('click', () => {
    if (gamePlayMode === 'normal') {
      gamePlayMode = 'computer';
      console.log(gamePlayMode, 'gamePlayMode');
    } else if (gamePlayMode === 'computer') {
      gamePlayMode = 'normal';
      console.log(gamePlayMode, 'gamePlayMode');
    }
    console.log('button pressed');
    changeGamePlayModeBtn.innerText = gamePlayMode;
  });
};

//* ** Anchor-Points ***//
// For the lack of a better name, Anchor-points refer to different possible origin co-ordinates
// for checkWinXY() and checkWinZ() functions to perform their match checks
// E.g in a 4 by 4 matrix where numOfSquaresToWin is set to 3,
// there are 4 possible right-anchor points, denoted by *
//
//
// [ 1 ] [ 1 ] [ 1 ] [   ]          [   ] [   ] [   ] [   ]
// [ 1 ] [ 1 ] [ 1 ] [   ]          [ 2 ] [ 2 ] [ 2 ] [   ]
// [ 1 ] [ 1 ] [ *1] [   ]          [ 2 ] [ 2 ] [ 2 ] [   ]
// [   ] [   ] [   ] [   ]          [ 2 ] [ 2 ] [ *2] [   ]
//
// [   ] [ 3 ] [ 3 ] [ 3 ]          [   ] [   ] [   ] [   ]
// [   ] [ 3 ] [ 3 ] [ 3 ]          [   ] [ 4 ] [ 4 ] [ 4 ]
// [   ] [ 3 ] [ 3 ] [ *3]          [   ] [ 4 ] [ 4 ] [ 4 ]
// [   ] [   ] [   ] [   ]          [   ] [ 4 ] [ 4 ] [ *4]
//
// Note: that 4 different 3x3 squares are possible within the 4x4 square for checking
//
// **** End of Illustration of Anchor-Points ***//

// Function that tracks every possible anchor-points
// oX and oY are right-most anchor-points of each possible square depending on 'numOfSquaresToWin'
// z is the left most col value depending on 'numOfSquaresToWin'
// Used with checkWin functions
/**
 * @param {Number} oX - row if checking horizontally; col if checking vertically
 * @param {Number} oY - col if checking horizontally; row if checking vertically
 * @param {String} direction - 4 directions: horizontal,vertical,
 *                           - diagonally (starting from) bot-right & bot-left
 * @param {Number} size - 'numOfSquaresToWin' to win or boardSize if playing full board game
 */
const trackAnchorPts = (oX, oY, direction, size) => {
  if (direction === 'horizontal') {
    initialRow = oX;
    initialCol = oY;
  } else if (direction === 'vertical') {
    // Swap the anchor-points since board is a square
    initialRow = oY;
    initialCol = oX;
  } else if (direction === 'bot-right') {
    initialRow = oX;
    initialCol = oY;
  } else if (direction === 'bot-left') {
    initialRow = oX;
    initialCol = oY;
    z = oY - (size - 1);
    console.log('z is reset');
  }
};

// To generate all permutations of possible anchor-points for match-checking
// in 'numOfSquaresToWin' scenario to win (larger than 3x3 permutation grid)
const createAnchorPts = () => {
  // AnchorPts store the origins for variable numOfSquare game
  // columns and rows are zero-indexed
  const rightAnchorPts = [];
  // To add another anchorPt in the array, increment by 1
  let i = 0;

  // oX refers to rows of an anchor-point
  // oY refers to column of an anchor-point
  for (let oX = boardSize; oX - numOfSquaresToWin >= 0; oX -= 1) {
    for (let oY = boardSize; oY - numOfSquaresToWin >= 0; oY -= 1) {
      rightAnchorPts.push({});
      rightAnchorPts[i].point = i + 1;
      rightAnchorPts[i].column = oX - 1;
      rightAnchorPts[i].row = oY - 1;
      i += 1;
    }
  }
  return rightAnchorPts;
};

// Function that checks for matches vertically or horizontally (in either 'x' or 'y' axis)
/**
 *
 * @param {Number} x - refers the global variable that is row of the right-most origin co-ordinate
 * @param {Number} y - refers the global variable that is col of the right-most origin co-ordinate
 * @param {String} direction - either check 'horizontal' or 'vertical'
 * @param {Number} size - input 'boardSize' for fixed full board game
 *                        or numOfSquaresToWin for var board game
 * Note: right and left-most boundaries are a function of numOfSquaresToWin if defined
 * Refer to end of script for more info
 */
const checkWinXY = (x, y, direction, size) => {
  // Swap x and y to toggle between checking horizontally
  // and vertically by using intermediate variables
  let a;
  let b;
  let c;
  let d;

  if (direction === 'horizontal') {
    // x is row
    a = x;
    // y is col
    b = y - 1;
    c = x;
    d = y;
  } else if (direction === 'vertical') {
    // x is col
    a = x - 1;
    // y is row
    b = y;
    c = y;
    d = x;
  }
  // Illustration are written for the case of checking horizontally (swap x and y for vertical)
  // Begin the horizontal checks from the origin (bottom-right most co-ordinate)
  // then check if it is equal to the box on its immediate left

  // Scenario 1: if the bottom 2 right boxes are not the same,
  // go up 1 row and re-evaluate the 2 right most boxes

  if (posMatrix[x][y] !== posMatrix[a][b] && c >= initialRow - (size - 1)) {
    // In the event we reached the last row where x === 0
    if (c === initialRow - (size - 1)) {
      // And the 2 right boxes are not the same, we arrived at our base case
      // BASE CASE: Once we reached the top left 2 boxes where y === 1 and y-1 === 0
      // Implicitly there is no match and hence no winner
      if (d === initialCol - (size - 2)) {
        console.log('no winner');
        outputValue1 = 'There is no winner';
        return outputValue1;
      }
      // Otherwise if not at the last row yet,
      // Traverse up one row and check the 2 right most squares again
    } else {
      if (direction === 'horizontal') {
        x -= 1;
        y = initialCol;
      } else {
        y -= 1;
        x = initialCol;
      }
      checkWinXY(x, y, direction, size);
    }
    // Scenario 2: if 2 consecutive boxes match at a certain row
  } else if (posMatrix[x][y] === posMatrix[a][b] && d >= initialCol - (size - 2)) {
    // And if the left 2 most squares are being compared
    // with left most boundary defined by either boardSize or numOfSquaresToWin.
    // This implicitly means that the 'whole' row is matched - hence it is a winner
    if (d === initialCol - (size - 2)) {
      console.log(`Player ${posMatrix[a][b]} has won!`);
      winner = `${posMatrix[a][b]}`;
      gameWon = true;
      outputValue1 = `Player ${posMatrix[a][b]} has won!`;
      outputValue4 = `Player ${posMatrix[a][b]} has won!`;
      return outputValue1;
    }
    // If not at the left 2 most squares, shift the column (pointer) 1 position left
    // and check for matches for the next consecutive left 2 squares
    if (direction === 'horizontal') {
      y -= 1;
    } else {
      x -= 1;
    }
    // include some count here to make sure
    checkWinXY(x, y, direction, size);
  }
};

// Function that checks for matches diagonally (in 'z' direction)

/**
 *
 * @param {Number} x - refers the global variable that is row of the right-most origin co-ordinate
 * @param {Number} y - refers the global variable that is col of the right-most origin co-ordinate
 * @param {Number} z - refers to global variable that is col of the left-most anchor co-ordinate
 * @param {String} direction - either check 'horizontal' or 'vertical'
 * @param {Number} size - input 'boardSize' for fixed full board game
 *                        or numOfSquaresToWin for var board game
 *
 * Note: right and left-most boundaries are a function of numOfSquaresToWin if defined
 * Refer to end of script for more info
 */
const checkWinZ = (x, y, z, direction, size) => {
  // using x and y at initialization implies starting to check from the bottom-right hand corner
  if (direction === 'bot-right') {
    if (posMatrix[x][y] === posMatrix[x - 1][y - 1]) {
      // Refer to extra game logic at end of script
      // for more info on defining x and y boundaries
      if (x === initialRow - (size - 2) && y === initialCol - (size - 2)) {
        console.log(`Player ${posMatrix[x][y]} has won!`);
        winner = `${posMatrix[x][y]}`;
        gameWon = true;
        outputValue2 = `Player ${posMatrix[x][y]} has won!`;
        outputValue5 = outputValue2;

        return outputValue2;
      }
      x -= 1;
      y -= 1;

      checkWinZ(x, y, z, direction, size);
    }
    // Start matching from the bottom - left to top-right
  } else if (direction === 'bot-left') {
    if (posMatrix[x][z] === posMatrix[x - 1][z + 1]) {
      // Refer to extra game logic at end of script
      // for more info on defining x and y boundaries
      if (x === initialRow - (size - 2) && z === initialCol - 1) {
        winner = `${posMatrix[x][z]}`;
        gameWon = true;
        console.log(`Player ${posMatrix[x][z]} has won!`);
        outputValue3 = `Player ${posMatrix[x][z]} has won!`;
        outputValue6 = outputValue3;
        return outputValue3;
      }
      x -= 1;
      z += 1;
      checkWinZ(x, y, z, direction, size);
    } else {
      // Stop gap measure to have 2 different outputvalues
      // due to bug when displaying to Fixed and Variable square games
      console.log('no winner');
      outputValue2 = 'There is no match';
      outputValue3 = 'There is no match';
    }
  }
};

// Function that encapsulates checkWinXY and checkWinZ for fixed boardSize scenario
const checkFixSizeWin = () => {
  // Check Horizontally
  // Track or (swap) the initialRow and initialCol depending on the direction checked
  // for each anchor-point
  trackAnchorPts(x, y, 'horizontal', 'boardSize');
  checkWinXY(x, y, 'horizontal', boardSize);
  gameResultDisplay1.innerText = `Checked horizontally: ${outputValue1}`;

  // Check Vertically
  trackAnchorPts(x, y, 'vertical', 'boardSize');
  checkWinXY(x, y, 'vertical', boardSize);
  gameResultDisplay2.innerText = `Checked vertically: ${outputValue1}`;

  // Check Diagonally from Bot-Left to Top-Right
  trackAnchorPts(x, y, 'bot-left', boardSize);
  checkWinZ(x, y, z, 'bot-left', boardSize);
  gameResultDisplay3.innerText = `Check top-right to bottom-left diagonally: ${outputValue3}`;

  // Check Diagonally from Bot-Right to Top-Left
  trackAnchorPts(x, y, 'bot-right', boardSize);
  checkWinZ(x, y, z, 'bot-right', boardSize);
  gameResultDisplay4.innerText = `Check top-left to bottom-right diagonally: ${outputValue2}`;
};

// Function that encapsulates checkWinXY and checkWinZ for 'numOfSquaresToWin' scenario
const checkVarSizeWin = () => {
// Create the initial set of anchor-points
  const rightAnchorPts = createAnchorPts();
  console.log(rightAnchorPts);

  // Go through each of the possible right anchor-points and check for matches in XY direction
  for (let i = 0; i < rightAnchorPts.length; i += 1) {
    const oX = rightAnchorPts[i].row;
    const oY = rightAnchorPts[i].column;
    // z =  column - (size-1) ['numOfSquaresToWin' is already 0 indexed];
    z = oY - (numOfSquaresToWin - 1);

    // Check Horizontally
    trackAnchorPts(oX, oY, 'horizontal', numOfSquaresToWin);
    checkWinXY(oX, oY, 'horizontal', numOfSquaresToWin);
    gameResultDisplay5.innerText = `Var Cards - Check horizontally: ${outputValue4}`;

    // Check Vertically
    trackAnchorPts(oX, oY, 'vertical', numOfSquaresToWin);
    checkWinXY(oX, oY, 'vertical', numOfSquaresToWin);
    gameResultDisplay6.innerText = `Var Cards - Check vertically: ${outputValue4}`;

    // Check Diagonally
    trackAnchorPts(oX, oY, 'bot-left', numOfSquaresToWin);
    checkWinZ(oX, oY, z, 'bot-left', numOfSquaresToWin);
    gameResultDisplay7.innerText = `Var Cards - Check bottom-right to top-left diagonally: ${outputValue5}`;

    trackAnchorPts(oX, oY, 'bot-right', numOfSquaresToWin);
    checkWinZ(oX, oY, z, 'bot-right', numOfSquaresToWin);
    gameResultDisplay8.innerText = `Var Cards - Check bottom-right to top-left diagonally: ${outputValue6}`;
  }
};

// Function that resets the game by re-initializing certain global varibles
const resetGame = () => {
  let countDown = 5;
  // reset the relevant global variables to resetGame;
  posMatrix.length = 0;
  gameWon = false;
  winner = '';
  outputValue1 = '';
  outputValue2 = '';
  outputValue3 = '';
  outputValue4 = '';
  outputValue5 = '';
  outputValue6 = '';
  currentPlayer = 'X';

  const restartGame = setInterval(() => {
    outputMessages.innerText = `Game is restarting in ${countDown}...`;
    countDown -= 1;
    if (countDown === 0) {
      clearInterval(restartGame);
      boardContainer.innerHTML = '';
      gamePage.innerHTML = '';
      gameInit();
      outputMessages.innerText = 'Please input number of squares or if blank, play the full board size. \nPlayer X begins first.';
    }
  }, 1000);
};

// Function that resets game and displays relevant messages after game is over
const checkIfGameOver = () => {
  if (gameWon === true) {
    console.log(winner, 'winner');
    outputMessages.innerText = `Game over! Player ${winner} wins!`;
    setTimeout(() => {
      resetGame();
    }, 2000);
  } else if (gameWon === false && movesLeft === 0) {
    console.log(winner, 'no winner!!!');
    outputMessages.innerText = 'Game over! There is no winner';
    setTimeout(() => {
      resetGame();
    }, 2000);
  }
};

// Function that returns a flat posMatrix array of
// all possible available positions in posMatrix indicated by string-numbers
const getAvailPosArray = () => {
  let availPosArray = [];
  let removed = [];
  availPosArray = posMatrix.flat();
  let i = 0;
  while (i < availPosArray.length) {
    if (availPosArray[i] === 'X' || availPosArray[i] === 'O') {
      removed = availPosArray.splice(i, 1);
      console.log('removed', removed);
      i = 0;
    } else {
      i += 1;
    }
  }
  console.log(availPosArray);
  return availPosArray;
};

// Function that randomly selects an index within the availPosArray
// to randomly select a string-number position in posMatrix
const randPosGen = (length) => Math.floor(Math.random() * length);

// Function that allows 'computer' to randomly select an available position and append its choice
// within posMatrix, where an available position is represented by a String-number
const computerRandSelect = () => {
  if (playerTurn === 'computer') {
    // why does this posMatrix also show the post-result of calling randPositionSelector?
    console.log(posMatrix, 'before');

    // Get a flat array of string-number labeled positions that corresponds to the posMatrix
    const availPosArray = getAvailPosArray();

    // Randomly select one of the string-number labeled positions in the flat posMatrix
    const indexOfRandPosition = randPosGen(availPosArray.length);

    // The string-number is then reproduced as chosenPosition
    const chosenNumPosition = availPosArray[indexOfRandPosition];
    console.log(chosenNumPosition, 'chosenPosition');

    // Loop through posMatrix and obtain computer's randomly selected position
    let i = 0;
    let row;
    let col;
    while (i < posMatrix.length) {
      col = posMatrix[i].findIndex((element) => {
        if (element === chosenNumPosition) {
          return true;
        }
        return false;
      });
      // If element is not found in current row, findIndex() will return -1;
      if (col === -1) {
      // then hence move on to next row
        i += 1;
      } else if (col !== -1) {
        row = i;
        break;
      }
    }
    console.log(row, 'row');
    console.log(col, 'col');
    console.log(posMatrix, 'after');

    // String-number position corresponds to square's string-number css id
    const squarePosID = posMatrix[row][col];
    const computerChosenSquare = document.getElementById(squarePosID);

    // Append currentPlayer symbol in place of corresponding String-number
    posMatrix[row][col] = currentPlayer;
    computerChosenSquare.innerText = currentPlayer;

    // Switch back to Player's turn
    togglePlayerTurn();
    // Switch back to Player's symbol- either 'X' or 'O'
    togglePlayerSymbol();
  }
};

// Function that assigns 'X' or 'O' to the position matrix based on the square clicked
const squareClick = (row, column) => {
  // Check if the clicked square has been clicked before
  if (posMatrix[row][column] !== 'X' && posMatrix[row][column] !== 'O') {
    // If not, assign current player's selection into matrix
    posMatrix[row][column] = currentPlayer;
    togglePlayerSymbol();
  }
};

// Function that completely rebuilds the entire board
const buildBoard = () => {
  // Initialise overall container that hold
  // 1)board display and 2) the match-result display elements
  gamePage = document.createElement('div');

  // Initialise match results Html display for fixed board size games
  gameResultDisplay1 = document.createElement('div');
  gameResultDisplay2 = document.createElement('div');
  gameResultDisplay3 = document.createElement('div');
  gameResultDisplay4 = document.createElement('div');

  // Initialise match results Html display for variable num of square games
  gameResultDisplay5 = document.createElement('div');
  gameResultDisplay6 = document.createElement('div');
  gameResultDisplay7 = document.createElement('div');
  gameResultDisplay8 = document.createElement('div');

  for (let i = 0; i < boardSize; i += 1) {
    // Create a row for each horizontal layer of the board
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    for (let j = 0; j < boardSize; j += 1) {
      // Create a square for column in the row
      const square = document.createElement('div');
      square.classList.add('square');

      // Sets an unique id to each square so 'computer'
      // can identify and append its selection
      square.setAttribute('id', `${posMatrix[i][j]}`);
      rowElement.appendChild(square);

      // Set a click eventListener to each square element
      // Disabling next-lines for lines below as it contains
      // unsafe references to variables(s)... no-loop-func
      // eslint-disable-next-line no-loop-func
      square.addEventListener('click', () => {
        // Check number of available squares left i.e moves
        movesLeft = getAvailPosArray().length - 1;
        console.log(movesLeft, 'movesLeft');

        if (playerTurn === 'player') {
          squareClick(i, j);
          if (square.innerText === '') {
            console.log(posMatrix[i][j]);
            square.innerText = posMatrix[i][j];
            outputMessages.innerText = `It is Player ${currentPlayer}'s turn`;
            // Function implicitly checks if gamePlayMode is true, if yes, then switch to 'computer'
            togglePlayerTurn();
            console.log(playerTurn, 'playerTurn');
            // Function implicitly checks if playerTurn is 'computer', computer chooses
            computerRandSelect();
          }
        }

        if (square.innerText !== '') {
          outputMessages.innerText = 'You may not click on the same square again!';
          // Turn off player-turn display when game ends and output game-over message only
          const userTurnDisplayRef = setTimeout(() => {
            if (gameWon === false) {
              outputMessages.innerText = `It is Player ${currentPlayer}'s turn`;
            } else if (gameWon === true || (gameWon === false && movesLeft === 0)) {
              clearInterval(userTurnDisplayRef);
            }
          }, 2000);
        }

        // Check for matches in scenario across the whole board
        // if num of squares to win is not defined
        if (!numOfSquaresToWin) {
          checkFixSizeWin();
          // after checking, if gameWon is true, restart game and output relevant message
          checkIfGameOver();
        } else {
        // Check for matches if variable squares to win is defined
          checkVarSizeWin();
          checkIfGameOver();
        }
      });
    }
    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// Function that creates user input, buttons and performs validation on
// and number of squares to win and board size
const createUserInput = () => {
  numSquaresInput = document.createElement('input');
  numSquaresInput.setAttribute('id', 'numSquaresInput');
  numSquaresInput.setAttribute('placeholder', 'Enter number of squares in a row that makes a win.');

  boardSizeInput = document.createElement('input');
  boardSizeInput.setAttribute('id', 'boardSizeInput');
  boardSizeInput.setAttribute('placeholder', 'Enter board size.');

  // displays message on user's input on num of squares
  numOfSquaresToWinInputDisplay = document.createElement('div');
  boardSizeInputDisplay = document.createElement('div');
  // submit button for numSquaresInput
  submitNumSquaresBtn = document.createElement('button');
  submitNumSquaresBtn.innerHTML = 'Submit';
  submitNumSquaresBtn.setAttribute('id', 'button');
  submitNumSquaresBtn.addEventListener('click', () => {
    const input = document.querySelector('#numSquaresInput');
    if (isNaN(input.value)) {
      numOfSquaresToWinInputDisplay.innerHTML = 'Please enter a valid number';
    } else {
      numOfSquaresToWinInputDisplay.innerHTML = `User chose ${input.value} consecutive squares as winning criteria.`;
      numOfSquaresToWin = Number(input.value);
    }
  });

  submitBoardSizeBtn = document.createElement('button');
  submitBoardSizeBtn.innerHTML = 'Submit';
  submitBoardSizeBtn.setAttribute('id', 'button');
  submitBoardSizeBtn.addEventListener('click', () => {
    const input = document.querySelector('#boardSizeInput');
    if (isNaN(input.value)) {
      boardSizeInputDisplay.innerHTML = 'Please enter a valid number';
    } else {
      boardSizeInputDisplay.innerHTML = `User chose ${input.value} as board size.`;
      boardSizeInput = Number(input.value);
      resetGame();
      boardSize = boardSizeInput;
    }
  });
};

// Function that creates the board container element and displays on the screen
const gameInit = () => {
  initPosMatrix();
  buildBoard();
  createUserInput();
  createGamePlayModeSelection();

  // Appending all children of gamePage here
  gamePage.appendChild(boardContainer);

  gamePage.appendChild(gameResultDisplay1);
  gamePage.appendChild(gameResultDisplay2);
  gamePage.appendChild(gameResultDisplay3);
  gamePage.appendChild(gameResultDisplay4);

  gamePage.appendChild(gameResultDisplay5);
  gamePage.appendChild(gameResultDisplay6);
  gamePage.appendChild(gameResultDisplay7);
  gamePage.appendChild(gameResultDisplay8);

  gamePage.appendChild(numSquaresInput);
  gamePage.appendChild(submitNumSquaresBtn);
  gamePage.appendChild(numOfSquaresToWinInputDisplay);

  // [WIP: buggy]
  gamePage.appendChild(boardSizeInput);
  gamePage.appendChild(submitBoardSizeBtn);
  gamePage.appendChild(boardSizeInputDisplay);

  gamePage.appendChild(changeGamePlayModeBtn);

  document.body.appendChild(gamePage);
  document.body.appendChild(outputMessages);
};

// ===================================EXECUTE GAME=================================//
gameInit();

// ===================[WIP]EXTRA-INFO ON MATCHING LOGIC(s)[WIP]=========================//
//
// ******************* CHECKING HORIZONTALLY & VERTICALLY**************************//
// Pattern To Understand for match checking in different sizes
// numOfSquaresToWin(size) Level*  Difference
//        3                 1       2
//        4                 2       2
//        5                 3       2
//        6                 4       2
// [WIP] Level* refers to number of rows and cols away from right anchor/origin coordinate
// to evaluate if base case has been reached.
// This is same for both rows and columns.
// Hence for initialRow or initialColumn, deduction of the difference 2 from size
// is needed for checking horizontally and vertically

// ******************************* CHECKING DIAGONALLY******************************//
// CHECKING DIAGONALLY
// For checking diagonally for variable number of squares:

// For checking from bottom right to top left (i.e bot-left):
// checkWinZ() is written such that it will always evaluate at the
// 2nd right highest point i.e 1 position left of its original anchor-point. Hence initialCol - 1;

// For checking bottom left to top right (i.e bot-right):
// checkWinZ() is written such that it will always evaluate at the
//  2nd left highest point i.e initialRow - (size - 2);

// P.S initialRow is zero-indexed and size is not zero-indexed
// P.S size is an argument that can take on numOfSquaresToWin or boardSize (i.e full board)
