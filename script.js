const quizData = [
    {
        question: "Какое выражение описывает полное согласие с родителями или друзьями во взглядах?",
        answers: ["See eye to eye", "Keep at arm's length", "Through thick and thin"],
        correct: 0
    },
    {
        question: "What does the idiom 'through thick and thin' mean in loyal friendship context?",
        answers: ["To be friends only during good times", "To support each other through all difficulties and troubles", "To end friendship quickly"],
        correct: 1
    },
    {
        question: "Which expression is equivalent to 'passing exams with top marks / excellently'?",
        answers: ["Hit the books", "Burn the midnight oil", "Pass with flying colours"],
        correct: 2
    },
    {
        question: "You need to describe extreme nervousness before the IELTS Speaking section. What would you say?",
        answers: ["I have butterflies in my stomach", "I am as fit as a fiddle", "I am down in the dumps"],
        correct: 0
    },
    {
        question: "Как переводится экономическое устойчивое выражение 'on a tight budget'?",
        answers: ["С запредельно высокой ценой", "При сильно ограниченном бюджете", "Купленный со скидкой"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    document.getElementById("next-button").style.display = "none";
    const q = quizData[currentQuestion];
    document.getElementById("question-text").innerText = q.question;
    document.getElementById("q-counter").innerText = `Вопрос ${currentQuestion + 1} из ${quizData.length}`;
    document.getElementById("progress").style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.innerText = answer;
        button.onclick = () => selectAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex, clickedButton) {
    if (answered) return;
    answered = true;
    const q = quizData[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");
    if (selectedIndex === q.correct) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
        buttons[q.correct].classList.add("correct");
    }
    document.getElementById("next-button").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-zone").style.display = "none";
    document.getElementById("result-zone").style.display = "block";
    document.getElementById("score-text").innerText = `${score} / ${quizData.length}`;
    let feedback = "";
    if (score === 5) feedback = "Великолепно! Идеальный уровень лексики для ОГЭ, ЕГЭ и IELTS! 🎯";
    else if (score >= 3) feedback = "Хороший результат! Но рекомендуем еще раз перечитать примеры из справочника выше. 👍";
    else feedback = "Нужно подтянуть лексику. Используй наш справочник для повторения материала! 📚";
    document.getElementById("feedback-text").innerText = feedback;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz-zone").style.display = "block";
    document.getElementById("result-zone").style.display = "none";
    loadQuestion();
}

loadQuestion();
