const columns = document.querySelectorAll(".column")
const nextMove = document.querySelector("#next-move")
const menu = document.querySelector(".winner-wrapper")
const title = document.querySelector("#title")
const winnerWrapper = document.querySelector(".winner-wrapper")

let O_turn = true
let O_moves = []
let X_moves = []
let moveCount = 0
let gameOver = false
let O_score = 0
let X_score = 0
let playCount = 0

const winningMoves = [
    ['top-left', 'top-center', 'top-right'], 
    ['center-left', 'center', 'center-right'],
    ['top-left', 'center', 'bottom-right'], 
    ['top-right', 'center', 'bottom-left'],
    ['top-left', 'center-left', 'bottom-left'],
    ['top-center', 'center', 'bottom-center'],
    ['bottom-left', 'bottom-center', 'bottom-right'],
    ['top-right', 'center-right', 'bottom-right']
]

const button = document.querySelector(".restart-button")
button.addEventListener('click', () => {
    O_moves = []
    X_moves = []
    moveCount = 0
    playCount += 1
    O_turn = (playCount % 2 == 0) ? true : false;
    whosTurn = (playCount % 2 == 0) ? "O" : "X"

    winnerWrapper.appendChild(nextMove)
    title.textContent = "Tic Tac Toe"
    nextMove.textContent = `its ${whosTurn} turn..`
    columns.forEach((column) => {
        const child = column.children[0]
        column.classList.remove('column-winner')
        if (child) {
            child.remove()
        }
    })
    gameOver = false
})

const nextPlayerToMove = (playerMoves, selectedColumn, player) => {
    const isSelected = selectedColumn.children[0]

    if (!isSelected) {        
        playerMoves.push(selectedColumn.id)
        if (playerMoves.length > 2) {
            winningMoves.forEach((item) => {
                let count = 0

                playerMoves.forEach((move) => {
                    const checkWin = item.includes(move)
                    if (checkWin) {
                        count += 1
                        if (count === 3 && !gameOver) {
                            console.log(`${player} WIN`)
                            item.forEach(winningMove => {
                                const column = document.getElementById(`${winningMove}`)
                                column.classList.add('column-winner')
                            })

                            nextMove.textContent = `${player} is WINNER`
                            gameOver = true

                            const winnerPlayer = document.getElementById(`${player}`)
                            if (player == "O" && gameOver) {
                                O_score += 1
                                winnerPlayer.textContent = `${player}-SCORE: ${O_score}`
                            } else if (player == "X" && gameOver) {
                                X_score += 1
                                winnerPlayer.textContent = `${player}-SCORE: ${X_score}`
                            }                        
                        }
                    }
                })
            })
        }

        const move = document.createElement("h3")
        move.textContent = `${player}`
        move.classList.add('big-text')
        move.classList.add('move-text')
        move.classList.add('unclickable')
        selectedColumn.appendChild(move)
        moveCount += 1

        if (player === "O") {
            nextMove.textContent = `its X turn..`
            O_turn = false
        } else {
            nextMove.textContent = `its O turn..`
            O_turn = true
        }
        
        if (moveCount === 9 && gameOver === false) {
            nextMove.textContent = "DRAW"
        }
    }
}

columns.forEach((column) => {
    column.addEventListener('click', (e) => {
        const selectedColumn = e.target
        if (!gameOver) {
            if (O_turn) {
                nextPlayerToMove(O_moves, selectedColumn, "O")
            } else {
                nextPlayerToMove(X_moves, selectedColumn, "X")
            }     
        }
    })
})
