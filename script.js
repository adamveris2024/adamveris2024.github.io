// Game state variables
let currentPlayer = 'X'; // this line makes it so X always goes first
let gameBoard = ['', '', '', '', '', '', '', '', '']; // this sets the board state to 9 empty squares
let gameActive = true; // this is telling the computer whether the game is active or not
let xWins = 0; // this line is setting the initial value for xWins
let oWins = 0; // this line is setting the initial value for oWins
let ties = 0; // this line is setting the initial value for ties

// this is an array of what combinations are needed to win
const winningCombinations = [
    [0, 1, 2], // box 1, 2, and 3 to win
    [3, 4, 5], // box 4, 5, and 6 to win
    [6, 7, 8], // box 7, 8, and 9 to win
    [0, 3, 6], // box 1, 4, and 7 to win
    [1, 4, 7], // box 2, 5, and 8 to win
    [2, 5, 8], // box 3, 6, and 9 to win
    [0, 4, 8], // box 1, 5, and 9 to win
    [2, 4, 6] // box 3, 5, and 7 to win
  ];
  
  // this function will display which player's turn it is
function updateTurnDisplay() {
    document.getElementById('turn').textContent = `Player ${currentPlayer}'s Turn`;
  }

  // this function is checking which player won
function checkWinner() {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a]; // returns 'X' or 'O' as the winner
      }
    }

    // Checks for a tie if none of the squares are empty and there's no winner
  if (!gameBoard.includes('')) {
    return 'Tie';
  }
  return null; // No winner has been decided yet
}

// Handle square click
function handleSquareClick(index) {
    if (!gameActive || gameBoard[index] !== '') return; // doesn't do anything if the game is over or the square is taken
  
    gameBoard[index] = currentPlayer; // this marks the square with the current player's symbol
    document.getElementById(`square-${index}`).textContent = currentPlayer; // this updates the square's ui
  
    const winner = checkWinner(); // this checks if there's a winner
    if (winner) {
      gameActive = false;
      if (winner === 'Tie') {
        alert('It\'s a tie!');
        ties++;
      } else {
        alert(`${winner} wins!`);
        winner === 'X' ? xWins++ : oWins++; // this adds a 1 to either X or O for the score
      }
      updateScoreboard(); // this updates the score board
    } else {
      // this line switches the turns
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateTurnDisplay();
    }
  }

// this function updates the scoreboard
function updateScoreboard() {
    document.getElementById('scoreboard-x').textContent = xWins;
    document.getElementById('scoreboard-o').textContent = oWins;
  }

// this functions lets you reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X'; // this makes it so even when the game is reset X is the first player
    updateTurnDisplay();

      // this line clears the game board ui
  for (let i = 0; i < 9; i++) {
    document.getElementById(`square-${i}`).textContent = '';
  }
}

// this line adds event listeners for each square
document.querySelectorAll('.game-square').forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(index));
  });
  
  // this line adds an event listener to the play again button
  document.getElementById('button-play-again').addEventListener('click', resetGame);
  
  // Initialize the game
  updateTurnDisplay();

// this line loads the scores from localStorage (you want this to execute first so its on top)
function loadScores() {
    xWins = localStorage.getItem('xWins') ? parseInt(localStorage.getItem('xWins')) : 0;
    oWins = localStorage.getItem('oWins') ? parseInt(localStorage.getItem('oWins')) : 0;
    ties = localStorage.getItem('ties') ? parseInt(localStorage.getItem('ties')) : 0;
    updateScoreboard();
  }

// this line saves the scores to localStorage
function saveScores() {
    localStorage.setItem('xWins', xWins);
    localStorage.setItem('oWins', oWins);
    localStorage.setItem('ties', ties);
  }

// this line updates the scoreboard and saves scores
function updateScoreboard() {
    document.getElementById('scoreboard-x').textContent = xWins;
    document.getElementById('scoreboard-o').textContent = oWins;
    saveScores();
}

// Call loadScores on page load
loadScores();