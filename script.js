const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", (e) => {
  const rootContainer = document.getElementById("root");
  const startButtonContainer = document.getElementById(
    "start-button-container"
  );
  startButtonContainer.style.display = "none";
  rootContainer.style.display = "block";

  initGame(board);
});
