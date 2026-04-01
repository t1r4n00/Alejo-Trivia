let timeLeft = 60;
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
  const answers = { q1: "B", q2: "A", q3: "B" };

  let score = 0;
  let q1 = data.get("q1");
  let q2 = data.get("q2");
  let q3 = data.get("q3");

  if (q1 === answers.q1) score++;
  if (q2 === answers.q2) score++;
  if (q3 === answers.q3) score++;

  // Send to Google Sheets
  fetch("YOUR_WEB_APP_URL_HERE", {
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