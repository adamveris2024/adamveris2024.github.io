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
