document.addEventListener("DOMContentLoaded", () => {
  const correctPercentage = parseFloat(localStorage.getItem("correctPercentage"));
  const wrongPercentage = parseFloat(localStorage.getItem("wrongPercentage"));
  const correctAnswers = localStorage.getItem("correctAnswers");
  const wrongAnswers = localStorage.getItem("wrongAnswers");

  const radius = 15.91549430918954;
  const circleCircumference = 2 * Math.PI * radius;

  const correctSegment = document.getElementById("correctSegment");
  const wrongSegment = document.getElementById("wrongSegment");

  correctSegment.style.strokeDasharray = `${circleCircumference}`;
  correctSegment.style.strokeDashoffset = `${circleCircumference * (1 - correctPercentage / 100)}`;

  wrongSegment.style.strokeDasharray = `${circleCircumference}`;
  wrongSegment.style.strokeDashoffset = `${circleCircumference * (1 - (correctPercentage + wrongPercentage) / 100)}`;
  wrongSegment.style.stroke = "#ff69b4";

  document.getElementById("percetualeCorrect").textContent = `${correctPercentage.toFixed(1)}%`;
  document.getElementById("correctTot").textContent = `${correctAnswers}/${totalQuestions} Answers`;

  document.getElementById("percentualeWrong").textContent = `${wrongPercentage.toFixed(1)}%`;
  document.getElementById("wrongTot").textContent = `${wrongAnswers} Wrong Answers`;
  displayResult(correctPercentage);
});


function displayResult(score) {
  const textElement = document.getElementById('circleText');
  const spanTextElement = document.getElementById('spanText');

  if (textElement) {
    if (score >= 50) {
      textElement.textContent = 'Congratulations!';

      if (spanTextElement) {
        spanTextElement.style.display = 'inline'; 
        spanTextElement.textContent = 'You passed the exam.';
      }

    } else {
      textElement.textContent = 'Unsuccessful Test';

      if (spanTextElement) {
        spanTextElement.style.display = 'none'; 
      }
    }
  } else {
    console.error('Element with id "circleText" not found.');
  }
}
