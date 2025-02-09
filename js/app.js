/*---------------------------- Constants ----------------------------*/
let squareEls  
const messageEls = document.querySelector('#message')
const resetBtnEl = document.getElementById('reset') 

const winningCombos = [
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7], 
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6]   
]

/*---------------------------- Variables ----------------------------*/
let board
let turn
let winner
let tie

/*---------------------------- Functions ----------------------------*/


function init() {
    board = ['', '', '', '', '', '', '', '', ''] 
    turn = 'X'  
    winner = false
    tie = false
    render() 
}

// Function to place a piece on the board
function placePiece(index) {
    board[index] = turn // Update the board array with the current player's move
}

// Function to check for a winner
function checkForWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo // Destructure the combo into positions
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = true
            return // Exit the function if there's a winner
        }
    }
    winner = false // No winner yet
}

// Function to check for a tie
function checkForTie() {
    if (winner) return 
    if (board.every(cell => cell !== '')) {
        tie = true
    } else {
        tie = false 
    }
}

// Function to update the message displayed based on the game state
function updateMessage() {
    if (winner) {
        if (turn === 'X') {
            messageEls.textContent = 'X win'
        } else {
            messageEls.textContent = 'O win'
        }
    } else if (tie) {
        messageEls.textContent = "ItS tie"
    } else {
        messageEls.textContent = `It's ${turn}'s turn!`
    }
}

// Update the board based on the current state
function updateBoard() {
    if (!squareEls) {
        console.error("squareEls is not defined")
        return
    }

    squareEls.forEach((square, index) => {
        square.textContent = board[index] // Set the text content of each square
        if (board[index] === 'X') {
            square.style.color = 'pink'
        } else if (board[index] === 'O') {
            square.style.color = 'blue' 
        } else {
            square.style.color = 'orange'
        }
    })
}

// Function to switch the player turn
function switchPlayerTurn() {
    if (winner) return // Don't switch the turn if there's already a winner
    turn = (turn === 'X') ? 'O' : 'X' // Switch the turn
}

// Handle the click event
function handleClick(event) {
    const clickedSquare = event.target
    const squareIndex = parseInt(clickedSquare.id) // Convert the ID to a number

    if (board[squareIndex] !== '' || winner || tie) {
        return // Exit if the square is already taken or if the game is over
    }

    placePiece(squareIndex) // Place the piece on the board
    checkForWinner() // Check if there's a winner after the move

    if (winner) {
        updateMessage() // Show the winner message
        render() // Re-render the board after the winner is determined
        return // Exit the function if there is a winner
    }

    checkForTie() // Check for a tie

    if (tie) {
        updateMessage() // Show the tie message
        render() // Re-render the board after a tie
        return // Exit the function if it's a tie
    }

    switchPlayerTurn() // Switch turns if no winner or tie
    render() // Re-render the board after the turn is switched
}

// Render the game board and message
function render() {
    updateBoard() // Update the board based on the current game state
    updateMessage() // Update the message based on the current game state
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    squareEls = document.querySelectorAll('.sqr') // Now safely select the square elements

    // Attach event listeners to each square
    squareEls.forEach((square) => {
        square.addEventListener('click', handleClick) // Add the click event listener
    })

    // Attach the reset functionality to the reset button
    resetBtnEl.addEventListener('click', init)

    // Initial render of the board when the page loads
    render()
})




