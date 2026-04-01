let timeLeft = 45;
let timer = setInterval(() => {
  timeLeft--;
  document.getElementById("timer").innerText = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    submitQuiz();
  }
}, 1000);

function submitQuiz() {
  clearInterval(timer);

  const name = document.getElementById("playerName").value || "Unknown";
  const form = document.getElementById("quizForm");
  const data = new FormData(form);

  // Correct answers
  const answers = { q1: "B", q2: "D", q3: "A" };

  let score = 0;
  let q1 = data.get("q1");
  let q2 = data.get("q2");
  let q3 = data.get("q3");

  if (q1 === answers.q1) score+=1;
  if (q2 === answers.q2) score+=2;
  if (q3 === answers.q3) score+=3;

  // Send to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbylKL_UIMQHHM9a6xPYZknJ-SNvgRAEThd4BClGzfffo8ZoJUtQSVbq1UKH1FNb7CVXjw/exec", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      score: score,
      q1: q1,
      q2: q2,
      q3: q3
    })
  });

  alert("Time's up! Your score: " + score);
}
