
const board = document.getElementById('tic-tac-toe-board');
const cells = Array.from({ length: 9 }, (_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    board.appendChild(cell);
    return cell;
});

let currentPlayer = 'X';
let winner = null;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = 'blue';
            cells[b].style.backgroundColor = 'blue';
            cells[c].style.backgroundColor = 'blue';
            return cells[a].textContent;
        }
    }

    if (cells.every(cell => cell.textContent !== '')) {
        return 'tie';
    }

    return null;
}

function handleClick(event) {
    const cell = event.target;
    if (!cell.textContent && !winner) {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        winner = checkWinner();

        if (winner === 'tie') {
            alert('It\'s a tie!');
        } else if (winner) {
            alert(`Player ${winner} wins!`);
        }
    }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));