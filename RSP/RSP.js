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
    setTimeout(changeComputerHand, 50); 
}
setTimeout(changeComputerHand, 50);

const clickButton = () => {
    clearInterval(intervalId);
    setTimeout(() => {
        intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);