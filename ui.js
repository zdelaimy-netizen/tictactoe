function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn");
  const restartBtn = document.querySelector(".restart");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    const winner = game.getWinner();
    const tie = game.isTie();
    const gameOver = game.isGameOver();

    if (winner) {
      turnDiv.textContent = `${winner.name} wins!`;
      turnDiv.classList.add("game-over");
    } else if (tie) {
      turnDiv.textContent = "It's a tie!";
      turnDiv.classList.add("game-over");
    } else {
      turnDiv.textContent = `${activePlayer.name}'s turn`;
      turnDiv.classList.remove("game-over");
    }

    board.forEach((cell, index) => {
      const btn = document.createElement("button");
      btn.classList.add("cell");
      if (gameOver) btn.classList.add("inactive");
      btn.dataset.index = index;
      btn.textContent = cell;
      boardDiv.appendChild(btn);
    });
  };

  function handleClick(e) {
    if (game.isGameOver()) return;

    const index = e.target.dataset.index;
    if (index === undefined) return;

    game.playRound(parseInt(index));
    updateScreen();
  }

  boardDiv.addEventListener("click", handleClick);

  restartBtn.addEventListener("click", () => {
    location.reload(); // simple reset
  });

  updateScreen();
}

ScreenController();
