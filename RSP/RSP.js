const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = './rsp.png'
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
    scissors: '0', //가위
    rock: '-220px', //바위
    paper: '-440px', //보
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
    if (computerChoice === 'scissors'){
        computerChoice = 'rock';
    } else if (computerChoice === 'rock') {
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissors';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
}
let intervalId = setInterval(changeComputerHand, 50);

const scoreTable = {
    rock: 0,
    scissors: 1,
    paper: -1,
};

let clickable = true;
let score = 0;
const clickButton = () => {
    if (clickable) {
        clearInterval(intervalId);
        clickable = false;
        const myChoice = event.target.textContent === 'Rock'
        ? 'rock'
        : event.target.textContent === 'Scissors'
         ? 'scissors'
         : 'paper';
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;  

    let message;
    if ([2, -1].includes(diff)) {
        score += 1;
        message = 'win';
    } else if ([2, -1].includes(diff)) {
        score -= 1;
        message = 'Lose';
    } else {
        message = 'Draw';
    }
    $score.textContent = `${message} Total : ${score} point`;
        setTimeout(() => {
            clickable = true; 
            intervalId = setInterval(changeComputerHand, 50);
        }, 1000);
    }
}

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);