const questions = [
    {
        question: 'Which is largest animal in the world?',
        answers: [
            { text: 'Shark', correct: false},
            { text: 'Blue Whale', correct: true},
            { text: 'Elephant', correct: false},
            { text: 'Giraffe', correct: false},
        ],
    },
    {
        question: 'Who are you?',
        answers: [
            { text: 'Masaki', correct: false},
            { text: 'Takahiro', correct: true},
            { text: 'Takeru', correct: false},
            { text: 'Tomohiro', correct: false},
        ],
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', nextQuestion);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    })
}

function nextQuestion() {

    currentQuestionIndex++;
    
    if (currentQuestionIndex > questions.length) {
        startQuiz();
    }
    else if (currentQuestionIndex == questions.length) {
        resetState();
        questionElement.innerHTML = `You get the ${score} corrects in ${questions.length} questions!!`;
        nextButton.innerHTML = 'Play Again!!';
        nextButton.style.display = 'block';
    }
    else if (currentQuestionIndex+1 == questions.length) {
        nextButton.innerHTML = 'Finish!';
        resetState();
        showQuestion();
    }
    else {
        resetState();
        showQuestion();
    }

}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    let selectAnswer = e.target;
    let isCorrect = selectAnswer.dataset.correct === 'true';
    if(isCorrect) {
        selectAnswer.classList.add('correct');
        score++;
    }
    else {
        selectAnswer.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }

        button.disabled = true;
    });

    nextButton.style.display = 'block';
}

startQuiz();

