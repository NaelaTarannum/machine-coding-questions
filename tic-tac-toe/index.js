const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cells = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message]');
let circleTurn;
// bord.classList.remove(X_CLASS)
const bord = document.getElementById('board')

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurn() {
    circleTurn = !circleTurn
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => combination.every(index => {
        return cells[index].classList.contains(currentClass)
    }))
}
function setBoardHoverClass(params) {
    bord.classList.remove(X_CLASS)
    bord.classList.remove(O_CLASS)
    if (circleTurn) bord.classList.add(O_CLASS)
    else {
        bord.classList.add(X_CLASS)
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()
    }
}
function isDraw() {
    return [...cells].every(cell => {
        // console.log(cell.classList);
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function startGame() {
    circleTurn = false
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
startGame()

restartButton.addEventListener('click', startGame)