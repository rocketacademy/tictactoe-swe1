// GAME LOGIC
// switch the global values from one player to the next
const togglePlayer = () => {
  console.log("togglePlayer", currentPlayer);
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};
