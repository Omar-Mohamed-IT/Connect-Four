const ROWS = 6;
const COLS = 7;
let currentPlayer = 'X'; // Player X will be the first
let board = Array(ROWS).fill().map(() => Array(COLS).fill(''));
const player1Chip = 'red.jpg'; // Replace with the actual path of Player 1's image
const player2Chip = 'blue.jpg'; // Replace with the actual path of Player 2's image
let gameOver = false; // Add the game over flag

document.addEventListener("DOMContentLoaded", function() 
{
    createBoard();
    updateStatus();
});

function createBoard() 
{
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board before recreating it
    for (let r = 0; r < ROWS; r++) 
    {
        for (let c = 0; c < COLS; c++) 
        {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
    gameOver = false; // Reset gameOver flag when the board is recreated
}

// Handles a player's move when they click on a column
function handleCellClick(event) 
{
    if (gameOver) return; // If the game is over, do nothing
    const col = parseInt(event.target.dataset.col);
    // Find the lowest empty row in the clicked column
    for (let row = ROWS - 1; row >= 0; row--) 
    {
        if (board[row][col] === '') 
        {
            board[row][col] = currentPlayer; // Set the cell with the current player's token
            updateCell(row, col); // Update the board visually
            if (checkWin(row, col)) 
            {
                document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
                gameOver = true; // Set game over flag to true when a player wins
                return;
            }
            switchPlayer(); // Change to the next player
            updateStatus();
            return;
        }
    }
    // If the column is full, alert the player
    alert('This column is full, please choose another one.');
}

// Updates the visual appearance of a cell after a move
function updateCell(row, col) 
{
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (currentPlayer === 'X') 
    {
        cell.style.backgroundImage = `url(${player1Chip})`; // Player X's chip image
    } 
    else 
    {
        cell.style.backgroundImage = `url(${player2Chip})`; // Player O's chip image
    }
    cell.style.backgroundSize = 'cover';
}

// Switch between players
function switchPlayer() 
{
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

// Update the status text to show whose turn it is
function updateStatus() 
{
    if (!gameOver) 
    {
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
}

// Check if there's a win after the current move
function checkWin(row, col) 
{
    // Checking all directions: horizontal, vertical, diagonal
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal (bottom-left to top-right)
        checkDirection(row, col, 1, -1)   // Diagonal (top-left to bottom-right)
    );
}

// Helper function to check a direction (horizontal, vertical, or diagonal) for a win
function checkDirection(row, col, rowDir, colDir) 
{
    let count = 1; // Start with the current chip
    count += countChips(row, col, rowDir, colDir);   // Check one direction
    count += countChips(row, col, -rowDir, -colDir); // Check the opposite direction
    return count >= 4; // Return true if we have 4 or more in a row
}

// Count chips in a given direction
function countChips(row, col, rowDir, colDir) 
{
    let r = row + rowDir;
    let c = col + colDir;
    let count = 0;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) 
    {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

// Reset the game
function resetGame() 
{
    board = Array(ROWS).fill().map(() => Array(COLS).fill(''));
    createBoard();
    currentPlayer = 'X'; // Start with Player X again
    updateStatus();
}
