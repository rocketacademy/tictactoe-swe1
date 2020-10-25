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

// -------------------Co-ordinates Tracking &  Management-----------------//

// Declares a matrix that tracks the positions of empty,X and O squares
// of the board for matching purposes
const posMatrix = [];

// To track row and column co-ordinates of 'origin' points for matching purposes
// Consts x and y are the 'origin' points for match-checking in the directions of
// 'horizontal', 'vertical' and diagonally (starting from) 'bot-right' & 'bot-left'
const x = boardSize - 1;
const y = boardSize - 1;

// Var z is the starting column co-ordinate used for
// checking diagonally (starting from) from bot-left to top-right;
// Can be recalculated depending on size either size of board or num of squares to win
let z = 0;

// Tracks initial anchor-points (origins) for numOfSquaresToWin
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
// To display miscellaneous messages such as game over, restarting game etc.
// To be accessible across multiple functions such as gameOver() and resetGame()
const outputMessages = document.createElement('div');
outputMessages.innerText = 'Please input number of squares or if blank, play the full board size. \nPlayer X begins first.';

// The element that contains the entire board
const boardContainer = document.createElement('div');

// Game display page
let gamePage;

// Display matches, if any for full boardSize game scenario
let gameResultDisplay1;
let gameResultDisplay2;
let gameResultDisplay3;
let gameResultDisplay4;

// Display matches, if any for variable boardSize (aka numOfSquaresToWin) game scenario
let gameResultDisplay5;
let gameResultDisplay6;
let gameResultDisplay7;
let gameResultDisplay8;

// Display of the results after checking
// for matches for scenario of fixed BoardSize
let outputValue1;
let outputValue2;
let outputValue3;

// Display of the results after checking for matches
// for scenario of variable numOfSquaresToWin
let outputValue4;
let outputValue5;
let outputValue6;

// Tracks user input on desired numOfSquaresToWin to win
let numSquaresInput;

// Refers to player's discretionary number of squares in a row as
// criteria for game to be won
let numOfSquaresToWin = numSquaresInput;

// Tracks user input on desired board size to play
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
const togglePlayer = () => {
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
  }
};

// Function that creates 'normal' and 'computer' in gamePlayMode
const createGameModeSelection = () => {
  changeGamePlayModeBtn = document.createElement('button');
  changeGamePlayModeBtn.innerText = gamePlayMode;
  gamePage.appendChild(changeGamePlayModeBtn);

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

// Function to reset anchor-points to initial co-ordinates
// Used with checkWin functions
const resetAnchorPts = () => {
  initialRow = '';
  initialCol = '';
};
// Function that tracks every possible anchor-points
// oX and oY are right-most anchor-points of each possible square depending on numOfSquaresToWin
// z is the left most col value depending on numOfSquaresToWin
// Used with checkWin functions
/**
 * @param {Number} oX - row if checking horizontally; col if checking vertically
 * @param {Number} oY - col if checking horizontally; row if checking vertically
 * @param {String} direction - 4 directions: horizontal,vertical,
 *                           - diagonally (starting from) bot-right & bot-left
 * @param {Number} size - numOfSquaresToWin to win or boardSize if playing full board game
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
// in numOfSquaresToWin scenario to win (larger than 3x3 permutation grid)
const createAnchorPts = () => {
// AnchorPts store the origins for variable numOfSquare game
  // columns and rows are zero-indexed
  const rightAnchorPts = [];
  // To add another anchorPt in the array, increment by 1
  let i = 0;

  // oX refers to rows
  // oY refers to column
  // using oX instead of generic variable document the draw linkage to the oX global variable

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
// Function that checks for matches vertically or horizontally (in either 'x' or 'y' directions)
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
      if (d === initialCol - (size - 2)) { // d===1
        console.log('no winner');
        outputValue1 = 'There is no winner';
        return outputValue1;
      }
      // Otherwise where y > 1, shift the pointer 1 box to the left and check for matches
      // Otherwise, go up one row and start from the most right position and check for }}matches
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
      winner = `${posMatrix[a][b]}`;
      gameWon = true;
      outputValue1 = `Player ${posMatrix[a][b]} has won!`;
      outputValue4 = `Player ${posMatrix[a][b]} has won!`;
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

// Function that checks for matches diagonally (in 'z' direction)
const checkWinZ = (x, y, z, direction, size) => {
  // using X and Y at initialization implies starting to check from the bottom right hand corner
  if (direction === 'bot-right') {
    if (posMatrix[x][y] === posMatrix[x - 1][y - 1]) {
      if (x === initialRow - (size - 2) && y === initialCol - (size - 2)) { // (x === 1 && y === 1)
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
    // Start matching from the left
  } else if (direction === 'bot-left') {
    if (posMatrix[x][z] === posMatrix[x - 1][z + 1]) {
      if (x === initialRow - (size - 2) && z === initialCol - 1) { // x === 1 & z === 1
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
      // 2 different outputvalues are required so that it does not conflict
      console.log('no winner');
      outputValue2 = 'There is no match';
      outputValue3 = 'There is no match';
    }
  }
};

// Function that encapsulates checkWinXY and checkWinZ for fixed boardSize scenario
const checkFixSizeWin = () => {
// Check from end to end of the board
  // Check Horizontally
  resetAnchorPts();
  trackAnchorPts(x, y, 'horizontal', 'boardSize');
  checkWinXY(x, y, 'horizontal', boardSize);
  gameResultDisplay1.innerText = `Checked horizontally: ${outputValue1}`;

  // Check Vertically
  resetAnchorPts();
  trackAnchorPts(x, y, 'vertical', 'boardSize');
  checkWinXY(x, y, 'vertical', boardSize);
  gameResultDisplay2.innerText = `Checked vertically: ${outputValue1}`;

  // Check Diagonally Left
  trackAnchorPts(x, y, 'bot-left', boardSize);
  checkWinZ(x, y, z, 'bot-left', boardSize);
  gameResultDisplay3.innerText = `Check top-right to bottom-left diagonally: ${outputValue3}`;

  // Check Diagonally Ri"ght
  trackAnchorPts(x, y, 'bot-right', boardSize);
  checkWinZ(x, y, z, 'bot-right', boardSize);
  gameResultDisplay4.innerText = `Check top-left to bottom-right diagonally: ${outputValue2}`;
};

// Function that encapsulates checkWinXY and checkWinZ for numOfSquaresToWin scenario
const checkVarSizeWin = () => {
// Create the initial set of anchor points
  const rightAnchorPts = createAnchorPts();
  console.log(rightAnchorPts);

  // Go through each of the possible right anchor points and check for matches in XY direction
  for (let i = 0; i < rightAnchorPts.length; i += 1) {
    const x = rightAnchorPts[i].row;
    const y = rightAnchorPts[i].column;
    z = y - (numOfSquaresToWin - 1); // column - (size-1) [numOfSquaresToWin is already 0 indexed];

    // //Check Horizontally
    resetAnchorPts();
    trackAnchorPts(x, y, 'horizontal', numOfSquaresToWin);
    checkWinXY(x, y, 'horizontal', numOfSquaresToWin);
    gameResultDisplay5.innerText = `Var Cards - Checked horizontally: ${outputValue4}`;
    // // Check Vertically
    resetAnchorPts();
    trackAnchorPts(x, y, 'vertical', numOfSquaresToWin);
    checkWinXY(x, y, 'vertical', numOfSquaresToWin);
    gameResultDisplay6.innerText = `Var Cards -Checked vertically: ${outputValue4}`;

    // Check Diagonally
    trackAnchorPts(x, y, 'bot-left', numOfSquaresToWin);
    checkWinZ(x, y, z, 'bot-left', numOfSquaresToWin);
    gameResultDisplay7.innerText = `Var Cards -Check top-left to bottom-right diagonally: ${outputValue5}`;

    trackAnchorPts(x, y, 'bot-right', numOfSquaresToWin);
    checkWinZ(x, y, z, 'bot-right', numOfSquaresToWin);
    gameResultDisplay8.innerText = `Var Cards -Check top-right to bottom-left diagonally: ${outputValue6}`;
  }
};

// Function that resets the game by re-initializing certain global varibles
const resetGame = () => {
  let countDown = 10;
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
// all possible empty positions in posMatrix indicated by string-numbers
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

// Function that randomly selects a position within the flat posMatrix array
const randPosGen = (length) => Math.floor(Math.random() * length);

// Function that allows 'computer' to append its choice in a random empty position
// within posMatrix, represented by a String-number
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
    togglePlayer();
  }
};

// Function that completely rebuilds the entire board every time there's a click
const buildBoard = () => {
  // Initialise overall container that hold
  // 1)board display and 2) the match-result display elements
  gamePage = document.createElement('div');

  // Initialise match results for fixed board size games
  gameResultDisplay1 = document.createElement('div');
  gameResultDisplay2 = document.createElement('div');
  gameResultDisplay3 = document.createElement('div');
  gameResultDisplay4 = document.createElement('div');

  // Initialise match results for variable board size games
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
      // Disabling next-lines for lines below as it seems to be too long apparently
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        // Check number of empty squares left i.e moves
        movesLeft = getAvailPosArray().length - 1;
        console.log(movesLeft, 'movesLeft');
        if (playerTurn === 'player') {
          squareClick(i, j);
          if (square.innerText === '') {
            square.innerText = posMatrix[i][j];
            outputMessages.innerText = `It is Player ${currentPlayer}'s turn`;
            togglePlayerTurn();
            console.log(playerTurn, 'playerTurn');
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
        // if variable squares to win is not defined
        if (!numOfSquaresToWin) {
          checkFixSizeWin();
          // after checking, if gameWon is true, restart Game and output relevant message
          checkIfGameOver();
        } else {
        // Check for matches if variable squares to win is defined
          checkVarSizeWin();
          checkIfGameOver();
        }
      });
    }
    console.log('test2');
    // add a single row to the board
    boardContainer.appendChild(rowElement);
    gamePage.appendChild(boardContainer);
    gamePage.appendChild(gameResultDisplay1);
    gamePage.appendChild(gameResultDisplay2);
    gamePage.appendChild(gameResultDisplay3);
    gamePage.appendChild(gameResultDisplay4);
    gamePage.appendChild(gameResultDisplay5);
    gamePage.appendChild(gameResultDisplay6);
    gamePage.appendChild(gameResultDisplay7);
    gamePage.appendChild(gameResultDisplay8);
    document.body.appendChild(gamePage);
  }
};

// Function that takes in user input + validation for board size
// and number of squares to win
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
    }
    resetGame();
    boardSize = boardSizeInput;
  });

  gamePage.appendChild(numSquaresInput);
  gamePage.appendChild(submitNumSquaresBtn);
  gamePage.appendChild(numOfSquaresToWinInputDisplay);

  gamePage.appendChild(boardSizeInput);
  gamePage.appendChild(submitBoardSizeBtn);
  gamePage.appendChild(boardSizeInputDisplay);
};

// Function that assigns 'X' or 'O' to the position matrix based on the square
const squareClick = (row, column) => {
  // Check if the clicked square has been clicked before
  if (gameWon !== true && posMatrix[row][column] !== 'X' && posMatrix[row][column] !== 'O') {
    // If not, assign current player's selection into matrix
    posMatrix[row][column] = currentPlayer;
    togglePlayer();
  }
};

// Function that creates the board container element and displays on the screen
const gameInit = () => {
  // build the board - right now it's empty
  // createPositionMatrix for tracking coordinates
  initPosMatrix();
  buildBoard();
  createUserInput();
  createGameModeSelection();
  document.body.appendChild(outputMessages);
};

// ===================================EXECUTE GAME=================================//
gameInit();

// ===================EXTRA-INFO ON MATCHING LOGIC(s)==============================//
// CHECKING HORIZONTALLY & VERTICALLY
// Pattern To Understand for match checking in different sizes
// numOfSquaresToWin(size) level  diff
//        3            1     2
//        4            2     2
//        5            3     2
//        6            4     2
// This is same for both rows and columns
// hence initialRow or initialColumn - (size - 2) ==> Works for checking horizontally and vertically

// CHECKING DIAGONALLY
// For checking diagonally for variable number of squares:

// For checking bottom left to bottom right
// checkWinZ() is written such that it will always evaluate at the
// 2nd right highest point i.e 1 position left of its original anchor point. Hence initialCol - 1;

// For checking bottom right to bottom left
// Fn is written such that it will always evaluate
// at the 2nd right highest point i.e initialRow - (size - 2);
// P.S initialRow is zero-indexed and size is not
// P.S size is an argument that can take on numOfSquaresToWin or boardSize (i.e full board)
