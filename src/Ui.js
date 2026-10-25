export function createBoard(player) {
    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.dataset.row = row;
            cell.dataset.column = column;
            player.appendChild(cell);
        }
    }
}

export function cleanBoard(gameBoard) {
    for (const cell of gameBoard.querySelectorAll('.cell')) {
        cell.className = 'cell';
        cell.style.backgroundColor = '';
    }
}

export function attackListener(gameBoard, callback) {
    gameBoard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('cell')) return;

        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        callback(row, column);
    });
}

export function renderBoard(uiBoard, gameBoard, isEnemy = false) {
    const matrix = gameBoard.board;
    const allCells = uiBoard.querySelectorAll('.cell');
    allCells.forEach((cell) => {
        cell.className = 'cell';
    });

    const visibleShipsMap = new Map();
    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
            const cellValue = matrix[row][column];
            const coordStr = `${row},${column}`;
            const cell = uiBoard.querySelector(
                `.cell[data-row='${row}'][data-column='${column}']`
            );

            const isHit = gameBoard.hitAttacks.has(coordStr);

            if (cellValue === 'miss') {
                cell.classList.add('miss');
            } else if (cellValue !== null && typeof cellValue === 'object') {
                if (!isEnemy || cellValue.isSunk()) {
                    if (!visibleShipsMap.has(cellValue)) {
                        visibleShipsMap.set(cellValue, []);
                    }
                    visibleShipsMap
                        .get(cellValue)
                        .push({ row, column, cell, isHit });
                } else if (isHit) {
                    cell.classList.add('hit');
                }
            }
        }
    }

    for (const [ship, coords] of visibleShipsMap.entries()) {
        const isSunk = ship.isSunk();
        const isHorizontal =
            coords.length > 1 && coords[0].row === coords[1].row;

        coords.forEach((item, index) => {
            item.cell.classList.add('ship-body', 'ship-dot');

            if (isSunk) {
                item.cell.classList.add('sunk');
            } else if (item.isHit) {
                item.cell.classList.add('hit-part');
            }

            if (coords.length === 1) {
                item.cell.classList.add('ship-single');
            } else if (index === 0) {
                item.cell.classList.add(
                    isHorizontal ? 'ship-left' : 'ship-top'
                );
            } else if (index === coords.length - 1) {
                item.cell.classList.add(
                    isHorizontal ? 'ship-right' : 'ship-bottom'
                );
            } else {
                item.cell.classList.add(
                    isHorizontal ? 'ship-middle-h' : 'ship-middle-v'
                );
            }
        });
    }
}
