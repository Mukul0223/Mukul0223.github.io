const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "Madrid", "London", "Rome"],
        correct: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Mars", "Jupiter", "Venus", "Saturn"],
        correct: "Jupiter"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Van Gogh", "Picasso", "Michelangelo", "Da Vinci"],
        correct: "Da Vinci"
    },
    {
        question: "What is the smallest country in the world?",
        choices: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: "Vatican City"
    },
    {
        question: "Which of the following programming languages was developed by Microsoft?",
        choices: ["Python", "JavaScript", "C++", "C#"],
        correct: "C#"
    },
    {
        question: "Which artist painted the famous work 'The Starry Night'?",
        choices: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dali"],
        correct: "Vincent van Gogh"
    },
    {
        question: "What is the capital city of Australia?",
        choices: ["Melbourne", "Canberra", "Sydney", "Brisbane"],
        correct: "Canberra"
    },
    {
        question: "What is the highest mountain in Africa?",
        choices: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Mount Denali"],
        correct: "Mount Kilimanjaro"
    },
    {
        question: "Which of these animals is not a mammal?",
        choices: ["Elephant", "Dolphin", "Turtle", "Kangaroo"],
        correct: "Turtle"
    },
    {
        question: "What is the largest organ in the human body?",
        choices: ["Liver", "Heart", "Brain", "Skin"],
        correct: "Skin"
    }
];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    deselectAnswers();
    const quizQuestion = quizData[currentQuestion];
    questionEl.innerText = quizQuestion.question;
    choicesEl.innerHTML = ""; // clear the choices element
    quizQuestion.choices.forEach(choice => {
        const li = document.createElement("li");
        li.innerText = choice;
        li.addEventListener("click", () => {
            selectAnswer(li, quizQuestion.correct);
        });
        choicesEl.appendChild(li);
    });
}


function selectAnswer(li, correctAnswer) {
    const selectedAnswer = li.innerText;
    if (selectedAnswer === correctAnswer) {
        li.classList.add("correct");
        score++;
    } else {
        li.classList.add("incorrect");
        const correctLi = Array.from(choicesEl.children).find(li => li.innerText === correctAnswer);
        correctLi.classList.add("correct");
    }
    Array.from(choicesEl.children).forEach(li => {
        li.classList.add("disabled");
    });
    submitBtn.disabled = false;
}

function deselectAnswers() {
    Array.from(choicesEl.children).forEach(li => {
        li.classList.remove("correct", "incorrect", "disabled");
    });
    submitBtn.disabled = true;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    scoreEl.innerText = "";
    submitBtn.innerText = "Submit";
    submitBtn.removeEventListener("click", resetQuiz);
}

function showScore() {
    questionEl.innerText = "";
    choicesEl.innerText = "";
    scoreEl.innerText = `You scored ${score} out of ${quizData.length}!`;
    submitBtn.innerText = "Restart";
    submitBtn.addEventListener("click", resetQuiz);
}

submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) {
        return;
    }
    currentQuestion++;
    if (currentQuestion >= quizData.length) {
        showScore();
    } else {
        loadQuestion();
    }
});

resetQuiz();
