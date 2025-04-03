const next_button = document.getElementById('next-button');
const quiz = document.getElementById('quiz');
const button_container = document.getElementById('button-container');
next_button.addEventListener('click', nextQuestion);


const questions = [
    {
        question: 'これの答えは何でしょう？',
        options: [
            {text: '増井', correct: true},
            {text: '崇', correct: false},
            {text: '泡盛', correct: false},
            {text: '女体盛', correct: false},
        ],
    },
    {
        question: 'これの答えは何でしょう2？',
        options: [
            {text: '増井', correct: false},
            {text: '崇', correct: false},
            {text: '泡盛', correct: true},
            {text: '女体盛', correct: false},
        ],
    },
    {
        question: 'これの答えは何でしょう3？',
        options: [
            {text: '増井', correct: false},
            {text: '崇', correct: false},
            {text: '泡盛', correct: false},
            {text: '女体盛', correct: true},
        ],
    },
];

let question_index = 0;
let score = 0;


function startQuiz() {

    resetButton();

    question_index = 0;
    score = 0;
    next_button.innerHTML = 'Next';

    showQuestion();
}

function showQuestion() {
    const current_question = questions[question_index];
    const question = current_question.question;
    
    quiz.innerHTML = `${1+question_index}.${question}`;

    current_question.options.forEach(option => {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = option.text;

        button_container.appendChild(button);
        
        button.dataset.correct = option.correct;
        button.addEventListener('click', selectAnswer);
    });

    question_index++;
}

function resetButton() {
    next_button.style.display = 'none';
    while(button_container.firstChild) {
        button_container.removeChild(button_container.firstChild);
    }
}

function selectAnswer(e) {
    let select_button = e.target;
    let is_correct = e.target.dataset.correct === 'true';

    if(is_correct) {
        select_button.classList.add('correct');
        score++;
    }
    else {
        select_button.classList.add('incorrect');
    }
    Array.from(button_container.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }

        button.disabled = true;
    })

    next_button.style.display = 'block';
}

function nextQuestion(e) {
    if (question_index > questions.length) {
        startQuiz();
    }
    else if (question_index === questions.length) {
        finishQuestion(e);
        question_index++;
    }
    else if (question_index + 1 === questions.length) {
        next_button.innerHTML = 'Finish!';
        resetButton();
        
        showQuestion();
    } else {
        resetButton();

        showQuestion();
    }
}

function finishQuestion(e) {
    resetButton();
    quiz.innerHTML = `Your score is ${score} in ${questions.length}`;
    next_button.innerHTML = 'See ya!';
    next_button.style.display = 'block';
}


startQuiz();