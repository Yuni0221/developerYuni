const { body } = document; 

const $table = document.createElement('table');
const $result = document.createElement('div');

const rows = [];
let turn = 'O';


const checkWinner = (target) => {
    let rowIndex;
    let cellIndex;
    rows.forEach((row, ri) => {
        row.forEach((cell, ci) => {
            if (cell === target) {
                rowIndex = ri;
                cellIndex = ci;
            }
        });
    });

    let hasWinner = false;

if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn 
) {
    hasWinner = true;
}

if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn 
) {
    hasWinner = true;
} 

if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
) {
    hasWinner = true;
}

if (
    rows[0][2].textContent === turn && 
    rows[1][1].textContent === turn && 
    rows[2][0].textContent === turn 
) {
    hasWinner = true;
}
    return hasWinner; 
};
 


const callback = (event) => {
    if (event.target.textContent !== '') {
        console.log('빈칸이 아닙니다.');
        return;
    }
        console.log('빈칸입니다.');
        event.target.textContent = turn;

        if (checkWinner(event.target)) {
            $result.textContent = `${turn}님이 Winner!`;
            return;
        }

        let draw = true;
        rows.forEach((row) => {
            row.forEach((cell) => {
                if (!cell.textContent) {
                    draw = false;
                }
            });
        });
        if (draw) {
            $result.textContent = `무승부!`;
            return;
        }

        turn = turn === 'X' ? 'O' : 'X';
    };


for (let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    for (let j = 0; j < 3; j++) {
        const $td = document.createElement('td');
        cells.push($td);
        $td.addEventListener('click', callback);
        $tr.append($td);
    }

    rows.push(cells);
    $table.append($tr);
}

document.body.append($table);
document.body.append($result);