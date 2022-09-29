const candidate = Array(45).fill().map((v, i) => i + 1);
const shuffle = [];
while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length); //무작위 인덱스 뽑기
    const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
    const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내서
    shuffle.push(value); // shuffle 배열에 넣기
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBalls, bonus);

const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');

const showBall = (number, $target) => {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    $target.appendChild($ball);
};

for (let i = 0; i < 6; i++) {
    setTimeout(() => {
        showBall(winBalls[i], $result);
    }, (i + 1) * 1000);
}
setTimeout(() => {
    showBall(bonus, $bonus);
}, 7000);