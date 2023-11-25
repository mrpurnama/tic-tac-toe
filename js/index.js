document.addEventListener('DOMContentLoaded', () => {
  const resetScore = document.getElementById("reset_score");
  const playerXWinCount = document.getElementById("player_x_win_count");
  const playerOWinCount = document.getElementById("player_o_win_count");
  const tieCount = document.getElementById("tie_count");
  const gamePlayed = document.getElementById("game_played");

  function initGamePlayed() {

    playerXWinCount.innerHTML = 0;
    playerOWinCount.innerHTML = 0;
    tieCount.innerHTML = 0;
    gamePlayed.innerHTML = 0;
  }
  initGamePlayed()

  resetScore.addEventListener("click", () => {
    initGamePlayed();
    optionsButton.click();
  });

  const optionsButton = document.getElementById("options_submit");

  const conditionContainer = document.getElementById("conditions");
  const resetScoreButton = document.getElementById("reset_score");

  optionsButton.addEventListener("click", () => {
    const boardSize = parseInt(document.getElementById("boardsize_input").value);
    if (boardSize >= 3) {
      optionsButton.innerHTML = "Reset";
      conditionContainer.style.display = 'block'
      resetScoreButton.style.display = 'inline-block'

      const isEven = value => value % 2 === 0;
      const isOdd = value => value % 2 === 1;
      const findWinPattern = array => array[0] === "" ? false : array.every(element => element === array[0]);

      const totalSquare = boardSize * boardSize;

      const boardContainer = document.getElementById("board_container");

      boardContainer.innerHTML = '<div id="board"></div>';
      const board = document.getElementById("board");
      board.style.height = `${100 * boardSize}px`;
      board.style.width = `${100 * boardSize}px`;

      for (let i = 0; i < totalSquare; i++) {
        board.innerHTML += '<div class="square" id="' + i + '"></div>';
      }

      const squares = document.getElementsByClassName("square");

      if (isOdd(totalSquare)) {
        for (let i = 0; i < totalSquare; i += 2) {
          squares[i].classList.add('bg-grey');
        }
      } else {
        for (let i = 0; i < totalSquare; i += 1) {
          if (isEven(i / boardSize)) {
            for (let indexSquare = i; indexSquare < i + boardSize; indexSquare += 2) {
              squares[indexSquare].classList.add('bg-grey');
            }
          } else if (isOdd(i / boardSize)) {
            for (let indexSquare = i + 1; indexSquare < i + boardSize; indexSquare += 2) {
              squares[indexSquare].classList.add('bg-grey');
            }
          }
        }
      }

      let winningPattern;

      const determineWinner = () => {
        for (let i = 0; i < totalSquare; i += boardSize) {
          const rowCheck = [];
          for (let indexSquare = i; indexSquare < i + boardSize; indexSquare += 1) {
            rowCheck.push(squares[indexSquare].innerHTML);
          }
          if (findWinPattern(rowCheck)) {
            winningPattern = rowCheck;
            return true;
          }
        }

        for (let i = 0; i < boardSize; i += 1) {
          const colCheck = [];
          for (let indexSquare = i; indexSquare < totalSquare; indexSquare += boardSize) {
            colCheck.push(squares[indexSquare].innerHTML);
          }
          if (findWinPattern(colCheck)) {
            winningPattern = colCheck;
            return true;
          }
        }

        const leftDiagonal = [];
        for (let i = 0; i < totalSquare; i += 1) {
          if (i % (boardSize + 1) === 0) {
            leftDiagonal.push(squares[i].innerHTML);
          }
        }

        if (findWinPattern(leftDiagonal)) {
          winningPattern = leftDiagonal;
          return true;
        }

        const rightDiagonal = [];
        for (let i = boardSize - 1; i < totalSquare - 1; i += 1) {
          if (i % (boardSize - 1) === 0) {
            rightDiagonal.push(squares[i].innerHTML);
          }
        }

        if (findWinPattern(rightDiagonal)) {
          winningPattern = rightDiagonal;
          return true;
        }
        return false;
      };

      const turnIndicator = document.getElementById("turn_indicator");
      turnIndicator.style.color = "black";
      turnIndicator.innerHTML = "Player X's Turn";

      let boardClicks = 0;
      let winningPlayer;
      let isTieGame = false;

      const squareClick = function () {
        if (!determineWinner() && !isTieGame) {
          if (isEven(boardClicks) && !this.innerHTML) {
            this.innerHTML = 'X';
            turnIndicator.style.color = "blue";
            turnIndicator.innerHTML = "Player O's Turn";
            boardClicks++;
          } else if (isOdd(boardClicks) && !this.innerHTML) {
            this.innerHTML = 'O';
            this.style.color = "blue";
            turnIndicator.style.color = "black";
            turnIndicator.innerHTML = "Player X's Turn";
            boardClicks++;
          } else {
            alert('You cannot move there. That space is taken.');
          }
        }

        if (winningPlayer) {
          alert('Player ' + winningPlayer + ' already win, click play again for continue the game');
        } else if (isTieGame) {
          alert('Tie Game, click play again for continue the game');
        } else if (boardClicks >= totalSquare || isTieGame) {
          alert('Tie Game, click play again for continue the game');
          if (boardClicks == totalSquare) {
            gamePlayed.innerHTML++;
            tieCount.innerHTML++;
            isTieGame = true;
          }
          boardClicks++;
          turnIndicator.style.color = "red";
          turnIndicator.innerHTML = "Tie Game !";
          document.getElementById("options_submit").innerHTML = "Play again?";
        } else if (determineWinner()) {
          winningPlayer = winningPattern[0];
          turnIndicator.style.color = "green";
          turnIndicator.innerHTML = `Player ${winningPlayer} wins!`;
          if (winningPlayer == 'X') {
            playerXWinCount.innerHTML++;
          } else {
            playerOWinCount.innerHTML++;
          }
          gamePlayed.innerHTML++;
          document.getElementById("options_submit").innerHTML = "Play again?";
        }
      };

      for (let i = 0; i < totalSquare; i++) {
        squares[i].addEventListener("click", squareClick);
      }
    } else {
      alert('The board size must be equal to or greater than 3 to make game playable')
    }

  });

});
