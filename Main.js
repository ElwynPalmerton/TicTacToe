//Iteratively Create the Board.
//Add the board to the DOM.
//Add the event listeners.
//Go over the board array to check for listeners.

//Keywords.
//Board.
//Turn.
//Winner/Lose/Tie.
//GameOver.

//Create Dom elements.
//Add Event Listeners.
//Take input and modify the boardArray.

//Board
var board = [];

//gameFlow
var player;
var winner;
var gameOver;

//table
var width = 3;
var height = 3;

//function makeBoard

function makeTable(y, x) {
  //Makes a table of y rows with x elements each.
  let table = document.createElement("table");
  for (let i = 0; i < y; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < x; j++) {
      let tile = document.createElement("td");
      row.appendChild(tile);
    }
    table.appendChild(row);
  }
  document.querySelector("#tableDiv").appendChild(table);
  return table;
}

function makeBoard(domTable) {
  let rows = Array.from(domTable.children);

  for (let i = 0; i < height; i++) {
    var boardRow = [];
    for (let j = 0; j < width; j++) {
      boardRow[j] = rows[i].children[j];
    }
    board[i] = boardRow;
  }
  return board;
}

//This should go in runGame???

function changePlayer(player, first) {
  if (player === "x") {
    return "o";
  } else {
    return "x";
  }
}

function checkWinner(gameState) {
  let winner = "";

  function check(...row) {
    if (row[0] === "x" && row[1] === "x" && row[2] === "x") {
      console.log("X wins!!!!!");
      return "X";
    }

    if (row[0] === "o" && row[1] === "o" && row[2] === "o") {
      console.log("O wins!!!!!!!");
      return "O";
    }
  }

  for (i = 0; i < height; i++) {
    //Checks rows.
    winner = check(gameState[i][0], gameState[i][1], gameState[i][2]);
    if (winner) return winner;
  }

  for (j = 0; j < width; j++) {
    //Checks columns.
    winner = check(gameState[0][j], gameState[1][j], gameState[2][j]);
    if (winner) return winner;
  }

  //Check diagonals.
  winner = check(gameState[0][0], gameState[1][1], gameState[2][2]);
  if (winner) return winner;
  winner = check(gameState[0][2], gameState[1][1], gameState[2][0]);
  if (winner) return winner;
} //End Check winner

function boardFull(gameState) {
  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      if (gameState[i][j] === " ") {
        return false;
      }
    }
  }
  return true;
}

var gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

function runGame(tiles) {
  let player = "x";
  let winner;
  let full;
  let status = document.getElementById("status");
  status.textContent = player.toUpperCase() + "'s turn.";

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      tiles[i][j].addEventListener("click", () => {
        //Check to make sure the tile is not taken.
        if (gameBoard[i][j] === "x" || gameBoard[i][j] === "o") {
          console.log("That square is taken.");
        } else {
          tiles[i][j].textContent = player;
          gameBoard[i][j] = player;

          player = changePlayer(player);
          status.textContent = player.toUpperCase() + "'s turn.";

          winner = checkWinner(gameBoard);
          if (winner) {
            status.textContent = winner + " WINS!!!!!";
          }

          full = boardFull(gameBoard);

          if (full) {
            status.textContent =
              "The board is full. Tie game. Press START to play again";
          }
        }
      });
    }
  }
}

let table = makeTable(height, width);

let domBoard = makeBoard(table);

runGame(domBoard);

//Create a button to start the game.
//After it starts change the button to say [Reset Game].

//After the game starts have the <h2> below the board say "Player [x] turn."
//After someone wins have the <h2> say who won.
//After the board is full have the <h2> say "Game Over. Tie Game."

//runGame
//makeBoard

//boardFull
//Player prompt: x's turn and o's turn.
//Start button.
//Winner announcement.
//BoardFull Announcement.
//X & O styling.
