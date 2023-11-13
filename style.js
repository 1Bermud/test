const questions = [
    {
        question: 'Выберите национальные домены 1-го уровня:',
        answers: [
            {text: 'org, mil', correct: false},
            {text: 'info, net', correct: false},
            {text: 'us, fr', correct: true},
            {text: 'com, edu', correct: false}
        ]
    },
    {
        question: 'По какому принципу можно выбрать домен?',
        answers: [
            {text: 'По имени/фамилии', correct: false},
            {text: 'По бренду', correct: false},
            {text: 'По виду деятельности', correct: false},
            {text: 'Все утверждения верны', correct: true}
        ]
    },
    {
        question: 'Выберите верное утверждение:',
        answers: [
            {text: 'Хостинг-провайдер - это лицо, владеющее хостом.', correct: false},
            {text: 'Фиксация освобождающих доменов - процедура создания новых доменов.', correct: false},
            {text: 'Домейнер - лицо, занимающееся регистрацией, продажей и покупкой доменных имен.', correct: true},
            {text: 'ISP - уникальный адрес сайта.', correct: false}
        ]
    },
    {
        question: 'Выберите верное утверждение для термина "доменное имя":',
        answers: [
            {text: 'Это символьно имя', correct: true},
            {text: 'Состоит только из одного уровня', correct: false},
            {text: 'Количество уровней задается автоматически', correct: false},
            {text: 'Идентифицирует владельца сайта', correct: false}
        ]
    },
    {
        question: 'Киберсквоттинг - это регистрация имен, содержащих торговую марку/коммерческое обозначение, принадлежащих другому лицу, с целью',
        answers: [
            {text: 'Улучшения качества работы сайта', correct: false},
            {text: 'Перепродажи', correct: true},
            {text: 'Уменьшения конкуренции', correct: false},
            {text: 'Все утверждения верны', correct: false}
        ]
    },
    {
        question: 'Что объединяет термины: домейнер, доменный брокер, киберсквоттинг?',
        answers: [
            {text: 'ISP', correct: false},
            {text: 'Хостинг', correct: false},
            {text: 'Создание новых доменов', correct: false},
            {text: 'Покупка домена', correct: true}
        ]
    }
]

const questionElement = document.getElementById('question')
const answerBtns = document.getElementById('answers')
const nextBtn = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    score = 0;
    currentQuestionIndex = 0;
    nextBtn.innerHTML = 'Следующий'
    showQuestion()
}

function showQuestion (){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerBtns.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}


function resetState(){
    nextBtn.style.display = 'none'
    while (answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer (e) {
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === 'true'
    if (isCorrect){
        selectBtn.classList.add('correct')
        score++;
    } else {
        selectBtn.classList.add('incorrect')
    }
    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextBtn.style.display = 'block'
}

function showScore (){
    resetState();
    questionElement.innerHTML = `Вы набрали ${score} из ${questions.length} баллов!`;
    nextBtn.innerHTML = 'Пройти тест снова';
    nextBtn.style.display = 'block'
}

function handleNextBtn () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion ()
    } else {
        showScore()
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length){
        handleNextBtn();
    } else {
        startQuiz();
    }
})
startQuiz()