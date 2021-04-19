const saveInput = document.getElementById("submit-button");
saveInput.addEventListener("click", () => {
  console.log("start");
  const numberInput = document.getElementById("size-input").value;
  const winningInput = document.getElementById("winning-input").value;
  boardSize = numberInput;
  winSquares = winningInput;
  console.log(boardSize);
  const prevBoard = document.querySelector("board-box");
  initGame();
});
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement("div");
  boardContainer.classList.add("board-box");
  document.body.appendChild(boardContainer);
  createBoardCoords(board);
  // build the board - right now it's empty
  buildBoard(board);
};
