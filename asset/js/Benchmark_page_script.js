
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
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

let score = 0;
let questionNumber = 0;
const totalQuestions = questions.length;
let timer; // Variabile per gestire l'intervallo del timer
let timeLeft = 20; // Tempo iniziale per il timer

function loadQuestion() {
  if (questionNumber === 0) {
    score = 0; // Reset score at the start of the quiz
  }
  if (questionNumber >= totalQuestions) {
    clearTimer(); // Stop the timer when the quiz ends
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

  resetTimer(); // Reset the timer before loading a new question

  let q = questions[questionNumber];
  document.getElementById("question-header").innerHTML = `QUESTION ${questionNumber + 1}<span>/${totalQuestions}</span>`;
  document.getElementById("question").innerHTML = q.question;

  let answers = [...q.incorrect_answers, q.correct_answer];
  // Fisher-Yates shuffle for reliable randomization
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  // Start the timer only after clicking "Proceed" from the welcome page
  if (questionNumber === 0 && !timer) {
    resetTimer();
  }

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

function updateTimer() {
  if (timeLeft <= 0) {
    clearTimer(); // Stop the timer when time runs out
    questionNumber++;
    loadQuestion();
  } else {
    const containerCountdown = document.getElementById("countdown");
    if (containerCountdown) {
      containerCountdown.innerText = `${timeLeft}s`;
    }
    timeLeft--;
  }
}

function resetTimer() {
  timeLeft = 20; // Reset the countdown to 20 seconds
  clearTimer(); // Stop any existing timer
  timer = setInterval(updateTimer, 1000); // Start a new timer
}

function clearTimer() {
  if (timer) {
    clearInterval(timer); // Stop the timer interval
    timer = null; // Remove the timer reference
  }
}

function calculatePercentages() {
  const correctPercentage = (score / totalQuestions) * 100;
  const wrongPercentage = 100 - correctPercentage;
  localStorage.setItem("correctPercentage", correctPercentage);
  localStorage.setItem("wrongPercentage", wrongPercentage);
  localStorage.setItem("correctAnswers", score);
  localStorage.setItem("wrongAnswers", totalQuestions - score);
}

function endQuiz() {
  clearTimer(); // Stop the timer before navigating to the results page
  calculatePercentages();
  window.location.href = "Results-Page.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const buttonssElement = document.getElementById("buttonss");
  if (buttonssElement) {
    buttonssElement.addEventListener("click", function () {
      window.location.href = "Results-Page.html";
    });
  }
});

window.onload = function () {
  loadQuestion(); // Load the first question when the page is loaded

  // Stop any existing timer if the page is reloaded
  clearTimer();

  // Hide any residual countdown on the results page
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.innerHTML = "";
  }
};