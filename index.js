const columns = document.querySelectorAll(".column")
const nextMove = document.querySelector("#next-move")
const menu = document.querySelector(".winner-wrapper")


let clicked = false
let O_moves = []
let X_moves = []
let moveCount = 0
let winner = false

const winningMoves = [
    ['top-left', 'top-center', 'top-right'], 
    ['center-left', 'center', 'center-right'],
    ['bottom-left', 'bottom-center', 'bottom-right'],
    ['top-left', 'center', 'bottom-right'], 
    ['top-right', 'center', 'bottom-left'],
    ['top-left', 'center-left', 'bottom-left'],
    ['top-center', 'center', 'bottom-center'],
    ['top-right', 'center-right', 'bottom-right']
]

const restartButton = (menu) => {

    const button = document.createElement('a')
    button.classList.add('start-button')
    button.classList.add('font-dynapuff')
    button.classList.add('restart-button')
    button.textContent = "Restart"
    menu.appendChild(button)

    button.addEventListener('click', () => {
        O_moves = []
        X_moves = []
        clicked = false
        moveCount = 0
        nextMove.textContent = "its O turn.."
        button.remove()
        columns.forEach((column) => {
            const child = column.children[0]
            column.classList.remove('column-winner')
            if (child) {
                child.remove()
            }
        })
        winner = false
    })
}

const nextPlayerToMove = (playerMoves, selectedColumn, player) => {
    const isSelected = selectedColumn.children[0]

    if (!isSelected) {
        if (player === "O") {
            nextMove.textContent = `its X turn..`
        } else {
            nextMove.textContent = `its O turn..`
        }
        
        playerMoves.push(selectedColumn.id)
        if (playerMoves.length > 2) {
            winningMoves.forEach((item) => {
                let count = 0
                
                playerMoves.forEach((move) => {
                    const checkWin = item.includes(move)
                    if (checkWin) {
                        count += 1
                        if (count === 3) {
                            console.log(`${player} WIN`)
                            item.forEach(winningMove => {
                                const column = document.getElementById(`${winningMove}`)
                                column.classList.add('column-winner')
                            })

                            restartButton(menu)
                            nextMove.textContent = `${player} is WINNER`
                            winner = true
                        }
                    }
                    
                })
            })
        }

        const move = document.createElement("h3")
        move.textContent = `${player}`
        move.classList.add('big-text')
        move.classList.add('unclickable')
        selectedColumn.appendChild(move)
        moveCount += 1

        if (moveCount === 9 && winner === false) {
            nextMove.textContent = "DRAW"
            restartButton(menu)
        }
    }
}

columns.forEach((column) => {
    column.addEventListener('click', (e) => {
        const selectedColumn = e.target
        if (!winner && !clicked) {
                nextPlayerToMove(O_moves, selectedColumn, "O")
                clicked = true         
        } else {
                nextPlayerToMove(X_moves, selectedColumn, "X")
                clicked = false             
        }
    })
})