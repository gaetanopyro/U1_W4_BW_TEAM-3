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
let timer; // Timer globale
let timeLeft = 20;

window.onload = function () {
  loadQuestion();
};

function loadQuestion() {
  if (questionNumber >= totalQuestions) {
    // Quando tutte le domande sono state completate
    clearInterval(timer); // Ferma il timer
    document.getElementById("countdown").innerHTML = ""; // Pulisce il countdown
    document.getElementById("question").innerHTML = "Quiz terminato!"; // Messaggio finale
    document.getElementById("options").innerHTML = ""; // Rimuove le opzioni
    document.getElementById("buttonss").innerHTML = ""; // Pulisce i bottoni precedenti

    // Crea il pulsante per visualizzare i risultati
    let btn2 = document.createElement("button");
    btn2.innerText = "Vai al risultato";
    btn2.onclick = endQuiz;
    document.getElementById("buttonss").appendChild(btn2); // Aggiungi il pulsante alla pagina
    return; // Esci dalla funzione, impedendo il caricamento di altre domande
  }

  // Reset del timer prima di caricare una nuova domanda
  resetTimer();
  startTimer();

  let q = questions[questionNumber];

  // Aggiorna l'intestazione della domanda
  document.getElementById("question-header").innerHTML = `QUESTION ${questionNumber + 1}<span>/${totalQuestions}</span>`;
  document.getElementById("question").innerHTML = q.question;

  // Mescola le risposte
  let answers = [...q.incorrect_answers, q.correct_answer];
  let optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = ""; // Pulisce le risposte precedenti

  // Crea i bottoni per le risposte
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
    score++; // Incrementa il punteggio se la risposta è corretta
  }
  questionNumber++; // Passa alla prossima domanda

  loadQuestion(); // Carica la prossima domanda
}

function startTimer() {
  let i = 0;
  let fullCircle = 283;

  // Avvia il timer
  timer = setInterval(function () {
    i++; // Incrementa ogni secondo

    // Aggiorna il tempo rimanente sullo schermo
    document.querySelector(".countdown-text").textContent = timeLeft - i;

    // Aggiorna la grafica del timer (cerchio)
    document.querySelector(".anello-sopra").style.strokeDashoffset = fullCircle - i * (fullCircle / timeLeft);

    // Quando il tempo è scaduto, passa alla domanda successiva
    if (i >= timeLeft) {
      clearInterval(timer); // Ferma il timer
      questionNumber++; // Passa alla prossima domanda
      loadQuestion(); // Carica la prossima domanda
    }
  }, 1000); // Ogni secondo
}

function resetTimer() {
  clearInterval(timer); // Ferma qualsiasi timer in corso
  timeLeft = 20; // Imposta il tempo rimanente a 20 secondi
  document.querySelector(".countdown-text").textContent = timeLeft; // Aggiorna il display del tempo
  document.querySelector(".anello-sopra").style.strokeDashoffset = 283; // Ripristina la grafica del cerchio
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
  calculatePercentages(); // Calcola le percentuali e memorizza i risultati
  window.location.href = "Results-Page.html"; // Reindirizza alla pagina dei risultati
}
