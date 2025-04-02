window.onload = function () {
  const punteggio = localStorage.getItem("score");
  const totaleDomande = localStorage.getItem("totalQuestions");

  if (punteggio !== null && totaleDomande !== null) {
    createDonutChart(parseInt(punteggio), parseInt(totaleDomande));

    function createDonutChart(score, totalQuestions) {
      const correctPercentage = (score / totalQuestions) * 100;
      const wrongPercentage = 100 - correctPercentage;

      const correctSegment = document.querySelector("correct-segment");
      const wrongSegment = document.querySelector("wrong-segment");

      const correctDash = correctPercentage + " " + (100 - correctPercentage);
      correctSegment.setAttribute("stroke-dasharray", correctDash);
      correctSegment.setAttribute("stroke", "#c2128d");

      const wrongDash = wrongPercentage + " " + (100 - wrongPercentage);
      wrongSegment.setAttribute("stroke-dasharray", wrongDash);
      wrongSegment.setAttribute("stroke", "#00ffff");
    }
  }
};

// localStorage.removeItem("punteggio");
//localStorage.removeItem("totaleDomande");
// } else {
// console.error("Dati del questionario non trovati.");
//
