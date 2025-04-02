document.addEventListener("DOMContentLoaded", () => {
  const correctPercentage = parseFloat(localStorage.getItem("correctPercentage")) || 0;
  const wrongPercentage = parseFloat(localStorage.getItem("wrongPercentage")) || 0;
  const correctAnswers = localStorage.getItem("correctAnswers") || "0";
  const wrongAnswers = localStorage.getItem("wrongAnswers") || "0";

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
  document.getElementById("correctTot").textContent = `${correctAnswers} Correct Answers`;

  document.getElementById("percentualeWrong").textContent = `${wrongPercentage.toFixed(1)}%`;
  document.getElementById("wrongTot").textContent = `${wrongAnswers} Wrong Answers`;
});
