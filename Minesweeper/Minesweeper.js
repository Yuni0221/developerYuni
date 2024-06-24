
const $timer = document.querySelector('#timer');
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');

const row = 10;
const cell = 10;
const mine = 10;
const CODE = {
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE: -6,
    OPENED: 0,
}

let data;
let openCount = 0;
let startTime = new Date();
const interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time}`;
}, 1000);


function plantMine() {
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
}

function onRightClick(event) {
    event.preventDefault();
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if (cellData === CODE.MINE) { //물음표 지뢰로
        data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
        target.className = 'question';
        target.textContent = '?';
    } else if (cellData === CODE.QUESTION_MINE) { //물음표 지뢰면
        data[rowIndex][cellIndex] = CODE.FLAG_MINE; //깃발 지뢰로
        target.className = 'flag';
        target.textContent = '!';
    } else if (cellData === CODE.FLAG_MINE) { //깃발 지뢰면
        data[rowIndex][cellIndex] = CODE.MINE; //지뢰로
        target.className = '';
        target.textContent = 'X';
    } else if (cellData === CODE.NORMAL) { //닫힌 칸이면
        data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
        target.className = 'question';
        target.textContent = '?';
    } else if (cellData === CODE.QUESTION) { // 물음표면
        data[rowIndex][cellIndex] = CODE.FLAG; // 깃발로
        target.className = 'flag';
        target.textContent = '!';
    } else if (cellData === CODE.FLAG) { //깃발이면
        data[rowIndex][cellIndex] = CODE.FLAG //닫힌 칸으로
        target.className = '';
        target.textContent = '';
    }

}

function countMine(rowIndex, cellIndex) {
    const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
    let i = 0;
    mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;  
    mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;    
    mines.includes(data[rowIndex][cellIndex - 1]) && i++;   
    mines.includes(data[rowIndex][cellIndex + 1]) && i++; 
    mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;    
    mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;    
    mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;    
    return i;
}

function open(rowIndex, cellIndex) {
    if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    if (!target) {
        return;
    }
    const count = countMine(rowIndex, cellIndex);
    target.textContent = count || '';
    target.className = 'opened';
    data[rowIndex][cellIndex] = count;
    openCount++;
    console.log(openCount);
    if (openCount === row * cell - mine) {
        const time = (new Date() - startTime) / 1000;
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);
        setTimeout(() => {
            alert(`You Win! ${time}초가 걸렸습니다.`);
        }, 500);
    }
    return count;
}

function openAround(rI, cI) {
    setTimeout(() => {
        const count = open(rI, cI);
        if (count === 0) {
            openAround(rI - 1, cI - 1);
            openAround(rI - 1, cI);
            openAround(rI - 1, cI + 1);
            openAround(rI, cI - 1);
            openAround(rI, cI + 1);
            openAround(rI + 1, cI - 1);
            openAround(rI + 1, cI);
            openAround(rI + 1, cI + 1);
        }
    }, 0);
}

function onLeftClick(event) {
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if (cellData === CODE.NORMAL) {
        openAround(rowIndex, cellIndex);
    } else if (cellData === CODE.MINE) {     
        target.textContent = '펑';
        target.className = 'opened';
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);  
    }
}

function drawTable() {
    data = plantMine();
    data.forEach((row) => {
        const $tr = document.createElement('tr');
        row.forEach((cell) => {
            const $td = document.createElement('td');
            if (cell === CODE.MINE) {
               // $td.textContent = 'X'; //개발 편의를 위해
            }
            $tr.append($td);
        }); 
        $tbody.append($tr);
        $tbody.addEventListener('contextmenu', onRightClick);
        $tbody.addEventListener('click', onLeftClick);
    });
} 

drawTable();