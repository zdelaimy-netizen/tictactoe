function ScreenController() {
  const game = GameController(); // create the game instance
  const turnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = ""; // clear old rendering

    const board = game.getBoard(); // new board state
    const activePlayer = game.getActivePlayer();

    turnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render all rows and cells
    board.forEach((row) => {
      row.forEach((cell, colIndex) => {
        const btn = document.createElement("button");
        btn.classList.add("cell");
        btn.dataset.column = colIndex;
        btn.textContent = cell.getValue();
        boardDiv.appendChild(btn);
      });
    });
  };

  // When user clicks a cell
  function clickHandlerBoard(e) {
    const col = e.target.dataset.column;
    if (col === undefined) return;

    game.playRound(parseInt(col));
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen(); // initial render
}

ScreenController();
