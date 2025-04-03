const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

window.onload = function () {
  loadQuestion();
};

let score = 0;
let questionNumber = 0;
const totalQuestions = questions.length;
let timer;
let timeLeft = 20; // Impostato il tempo a 20 secondi

function loadQuestion() {
  if (questionNumber >= totalQuestions) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "";
    document.getElementById("question").innerHTML = "Quiz terminato!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("buttonss").innerHTML = "";
    let btn2 = document.createElement("button");
    btn2.innerText = "Vai al risultato";
    btn2.onclick = endQuiz;
    document.getElementById("buttonss").appendChild(btn2);
    return;
  }

  startTimer(); // Inizializza e avvia il timer

  let q = questions[questionNumber];

  document.getElementById("question-header").innerHTML = `QUESTION ${questionNumber + 1}<span>/${totalQuestions}</span>`;
  document.getElementById("question").innerHTML = q.question;

  let answers = [...q.incorrect_answers, q.correct_answer];

  let optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  answers.forEach((answer) => {
    let btn = document.createElement("button");
    btn.innerText = answer;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(answer);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedAnswer) {
  if (selectedAnswer === questions[questionNumber].correct_answer) {
    score++;
  }
  questionNumber++;
  loadQuestion();
}

const questionAnswer = document.getElementById("question");
questionAnswer.style.fontSize = "40px";
questionAnswer.style.marginBottom = "50px";
questionAnswer.style.marginTop = "60px";
questionAnswer.style.paddingLeft = "180px";
questionAnswer.style.paddingRight = "180px";

function startTimer() {
  let i = 0;
  let fullCircle = 283;

  let interval = setInterval(function () {
    i++;

    document.querySelector(".countdown-text").textContent = timeLeft - i;

    document.querySelector(".anello-sopra").style.strokeDashoffset = fullCircle - i * (fullCircle / timeLeft);

    if (i >= timeLeft) {
      clearInterval(interval);
      questionNumber++;
      loadQuestion();
    }
  }, 1000);
}

document.getElementById("buttonss").addEventListener("click", function () {
  window.location.href = "Results-Page.html";
});

function calculatePercentages() {
  const correctPercentage = (score / totalQuestions) * 100;
  const wrongPercentage = 100 - correctPercentage;
  localStorage.setItem("correctPercentage", correctPercentage);
  localStorage.setItem("wrongPercentage", wrongPercentage);
  localStorage.setItem("correctAnswers", score);
  localStorage.setItem("wrongAnswers", totalQuestions - score);
}

function endQuiz() {
  calculatePercentages();
  window.location.href = "Results-Page.html";
}
