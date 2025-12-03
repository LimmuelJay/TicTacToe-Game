console.log("TEST")

const columns = document.querySelectorAll(".column")
const nextMove = document.querySelector("#next-move")
const menu = document.querySelector(".winner-wrapper")


let clicked = false

let O_moves = []
let X_moves = []
let moveCount = 0
winner = false

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


columns.forEach((column) => {
    column.addEventListener('click', (e) => {
        const selectedColumn = e.target
        if (!winner) {
            if (!clicked) {
                const child = selectedColumn.children[0]
                if (!child) {
                    nextMove.textContent = "its X turn.."
                
                    O_moves.push(selectedColumn.id)
                    if (O_moves.length > 2) {
                        winningMoves.forEach((item) => {
                            let count = 0
                            
                            O_moves.forEach((move) => {
                                const checkWin = item.includes(move)
                                if (checkWin) {
                                    count += 1
                                    if (count === 3) {
                                        console.log("O WIN")
                                        item.forEach(winningMove => {
                                            const column = document.getElementById(`${winningMove}`)
                                            column.classList.add('column-winner')
                                        })

                                        restartButton(menu)
                                        nextMove.textContent = "O is WINNER"
                                        winner = true
                                    }
                                }
                                
                            })
                        })
                    }

                    const move = document.createElement("h3")
                    move.textContent = "O"
                    move.classList.add('big-text')
                    selectedColumn.appendChild(move)
                    moveCount += 1
                    console.log(moveCount)
                    if (moveCount === 9) {
                        console.log("DRAW")
                        nextMove.textContent = "DRAW"

                        restartButton(menu)
                    }

                    clicked = true
                }
            } else {
                const child = selectedColumn.children[0]
                if (!child) {
                    //console.log("X Turn")
                    nextMove.textContent = "its O turn.."

                    X_moves.push(selectedColumn.id)
                    if (X_moves.length > 2) {
                        winningMoves.forEach((item) => {
                            let count = 0

                            X_moves.forEach((move) => {
                                const checkWin = item.includes(move)
                                if (checkWin) {
                                    count += 1
                                    if (count === 3) {
                                        console.log("X WIN")

                                        item.forEach(winningMove => {
                                            const column = document.getElementById(`${winningMove}`)
                                            column.classList.add('column-winner')
                                        })

                                        restartButton(menu)

                                        nextMove.textContent = "X is WINNER"
                                        winner = true
                                    }
                                }
                                
                            })
                        })
                    }

                    const move = document.createElement("h3")
                    move.textContent = "X"
                    move.classList.add('big-text')
                    selectedColumn.appendChild(move)
                    moveCount += 1
                    clicked = false
                }
            }
        }
    })
})