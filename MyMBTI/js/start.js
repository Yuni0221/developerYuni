const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
   
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    // 이미지 태그 생성
    var uniImage = document.createElement('img');

    // 이미지 주소 변수화
    var imgURL = 'img/image-' + point + '.png';

    // 이미지 소스 주입
    uniImage.src = imgURL;

    // Alt 주입
    uniImage.alt = point;

    // 클래스 주입
    uniImage.classList.add('img-fluid');

    const imgDiv = document.querySelector('#resultImg');
    imgDiv.appendChild(uniImage);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;

}

function goResult(){
    qna.style.webkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.webkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})
        setResult();
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.webkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            } 
            
            for(let i = 0; i < children.length; i++){
                children[i].style.display= 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function goNext(qIdx) {

    if(qIdx === endPoint) {
         goResult();
         return;
     }
     var q = document.querySelector('.qBox');
     q.innerHTML = qnaList[qIdx].q;
     for(let i in qnaList[qIdx].a) {
         addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
     }
     var status = document.querySelector('.statusBar');
     status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
    main.style.webkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.webkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}