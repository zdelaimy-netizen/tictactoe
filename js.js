// first start with building the tictactoe logic in console
// What are the objects)
// Gameboard (stores the state of the 9 squares, knows what each sq contains, allows placing marks, can reset
// Players (have a name, have a mark X or 0)
// GameController (manages turns, tells the board to place a mark, checks for winners / ties)
// screen controller (renders board to HTML, lets players click squares, updates messages)

function Gameboard() {
  const board = ["", "", "", "", "", "", "", "", ""]; // 9 cells

  const getBoard = () => board;

  const placeMark = (index, mark) => {
    // only place mark if the cell is empty
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }

    return false;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, placeMark, resetBoard };
}

function Player(name, mark) {
  return { name, mark };
}

// gamecontroller
// Keeps track of current player
// asks board to place a mark
// checks for win conditions
// switches turn

function GameController(player1Name = "Player X", player2Name = "Player O") {
  const board = Gameboard();

  const players = [Player(player1Name, "X"), Player(player2Name, "O")];

  let activePlayer = players[0];
  let gameOver = false;
  let winner = null;
  let tie = false;

  const getActivePlayer = () => activePlayer;
  const isGameOver = () => gameOver;
  const getWinner = () => winner;
  const isTie = () => tie;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    const boardState = board.getBoard();

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return "win";
      }
    }

    if (boardState.every((cell) => cell !== "")) return "tie";

    return null;
  }

  const playRound = (index) => {
    if (gameOver) return;

    const moveSuccess = board.placeMark(index, activePlayer.mark);
    if (!moveSuccess) return; // invalid move

    const result = checkWinner();
    if (result === "win") {
      gameOver = true;
      winner = activePlayer;
      return;
    }

    if (result === "tie") {
      gameOver = true;
      tie = true;
      return;
    }

    switchPlayer();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    isGameOver,
    getWinner,
    isTie,
  };
}
