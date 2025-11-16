// Connect four rules: 6 rows and 7 colums
// players alternate turns, dropping a token into a column and falling into the lowest cell
// the board remembers which cells are filled
// first player to have 4 in a row wins

// identifying objects: Cell, board, GameController

// states:
// Cell state: empty, player 1 or player
// gameboard state: 2d array of cells
// gamecontroller state: active player, names of players, reference to the gameboard

// Cell behavior: add token, get value

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

// Gamboard behavior
// gameboard: build the 6x7 grid
// find the lowest empty cell in a colum
// drop the token there
// provide board state
// print board

function Gameboard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  // add drop token logic

  const dropToken = (column, player) => {
    const available = []; // available empty cells

    for (let row = 0; row < rows; row++)
      if (board[row][column].getValue() === 0) {
        available.push(row);
      }

    if (available.length === 0) return;

    const lowestRow = available[available.length - 1];

    board[lowestRow][column].addToken(player);
  };

  const printBoard = () => {
    const values = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(values);
  };

  return { getBoard, dropToken, printBoard };
}

// gameController behavior
// initialize gameboard
// switch players
// drop tokens
// print board after every move

function GameController(name1 = "Player 1", name2 = "Player 2") {
  const board = Gameboard();

  const players = [
    { name: name1, token: 1 },
    { name: name2, token: 2 },
  ];

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printTurnInfo = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s turn.`);
  };

  const playRound = (column) => {
    console.log(
      `Dropping token from ${activePlayer.name} into column ${column}`
    );
    board.dropToken(column, activePlayer.token);

    switchPlayer();
    printTurnInfo();
  };

  printTurnInfo();

  return { playRound, getActivePlayer };
}

const game = GameController();
