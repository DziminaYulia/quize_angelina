let question_field = document.querySelector('.question')
let answer_btn = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')
let container_main= document.querySelector('.main')
let container_start= document.querySelector('.start')
let start_btn= document.querySelector('.start-btn')
let cookie=false;
let cookies=document.cookie.split(';');

for (i=0; i<cookies.length; i+=1){
    if(cookies[i].split('=')[0]=='numbers_high_score'){
        cookie=cookies[i].split('=')[1]
        break;
    }
}

if(cookie){
    let data = cookie.split('/')
    container_h3.innerHTML = `Минулого разу ви дали ${data[1]} правильних відповідей із ${data[0]}. Точність - ${Math.round(data[1]*100/data[0])}`
}

function randit(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

let sings = ["+","-","*","/"];
function getRandomSign(){
    return sings[randit(0,3)];
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

class Question{
    constructor(){
        let a = randit(1,100);
        let b =randit(1,100);
        let sign = getRandomSign();

        this.question = `${a} ${sign} ${b}`;
        if(sign == '+'){this.correct = a+b}
        else if(sign == '-'){this.correct = a-b}
        else if(sign == '*'){this.correct = a*b}
        else if(sign == '/') {this.correct = Math.round((a/b)*100)/100}



        this.answers = [
            randit(this.correct-15, this.correct-10),
            randit(this.correct+10, this.correct-10),
            this.correct,
            randit(this.correct+15, this.correct+10),
            randit(this.correct+15, this.correct-15),
        ];

        shuffle(this.answers)
    }

    display(){
        question_field.innerHTML=this.question

        for(let i=0; i<this.answers.length; i+=1){
            answer_btn[i].innerHTML=this.answers[i]
        }
    }
}

let current_question = new Question()

let total = 0
let correct_answers_given;


start_btn.addEventListener('click', 
function(){
    container_start.style.display= 'none'
    container_main.style.display = 'flex'
   current_question.display() 
   total = 0
   correct_answers_given = 0

setTimeout(function (){
    container_start.style.display= 'flex'
    container_main.style.display = 'none'
    let new_cookie = `numbers_high_score=${total}/${correct_answers_given};max-age=1000000000000000`
    document.cookie=new_cookie;

container_h3.innerHTML=`Ви дали ${correct_answers_given} правильних відповідей із ${total} 
Точність - ${Math.round(correct_answers_given *100/total)}%`
},10000)

}
)



for(let i=0; i<answer_btn.length; i+=1){
    answer_btn[i].addEventListener('click', function(){
        if(answer_btn[i].innerHTML==current_question.correct){    
            correct_answers_given += 1
            answer_btn[i].style.background = '#00ff00'
            anime({
                targets:answer_btn[i],
                background: '#ffffff',
                duration:500,
                delay:100,
                easing:'linear'
            })
        }else{
            answer_btn[i].style.background = '#ff0000'
            anime({
                targets:answer_btn[i],
                background: '#ffffff',
                duration:500,
                delay:100,
                easing:'linear'
            })
        }

    total += 1
    current_question = new Question()
    current_question.display()

    })
}