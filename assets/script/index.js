"use strict";

const wordInput = document.getElementById("word-input");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const wordsContainer = document.querySelector(".words");
const bgMusic = document.getElementById("bg-music");

let words = [
  "dinosaur",
  "love",
  "pineapple",
  "calendar",
  "robot",
  "building",
  "population",
  "weather",
  "bottle",
  "history",
  "dream",
  "character",
  "money",
  "absolute",
  "discipline",
  "machine",
  "accurate",
  "connection",
  "rainbow",
  "bicycle",
  "eclipse",
  "calculator",
  "trouble",
  "watermelon",
  "developer",
  "philosophy",
  "database",
  "periodic",
  "capitalism",
  "abominable",
  "component",
  "future",
  "pasta",
  "microwave",
  "jungle",
  "wallet",
  "canada",
  "coffee",
  "beauty",
  "agency",
  "chocolate",
  "eleven",
  "technology",
  "alphabet",
  "knowledge",
  "magician",
  "professor",
  "triangle",
  "earthquake",
  "baseball",
  "beyond",
  "evolution",
  "banana",
  "perfumer",
  "computer",
  "management",
  "discovery",
  "ambition",
  "music",
  "eagle",
  "crown",
  "chess",
  "laptop",
  "bedroom",
  "delivery",
  "enemy",
  "button",
  "superman",
  "library",
  "unboxing",
  "bookstore",
  "language",
  "homework",
  "fantastic",
  "economy",
  "interview",
  "awesome",
  "challenge",
  "science",
  "mystery",
  "famous",
  "league",
  "memory",
  "leather",
  "planet",
  "software",
  "update",
  "yellow",
  "keyboard",
  "window",
];

let remainingTime = 10;
let score = 0;
let isRunning = false;
let intervalId;
let gameStarted = false;
let resultArr = "";

const mediaRun = new IntersectionObserver((views) => {
  views.forEach((view) => {
    if (view.isIntersecting) {
      view.target.classList.add("show");
    } else {
      view.target.classList.remove("show");
    }
  });
});

const mediaElements1 = document.querySelectorAll(".word-1");
mediaElements1.forEach((e) => mediaRun.observe(e));

const mediaElements2 = document.querySelectorAll(".word-2");
mediaElements2.forEach((e) => mediaRun.observe(e));

const mediaElements3 = document.querySelectorAll(".word-box");
mediaElements3.forEach((e) => mediaRun.observe(e));

class Score {
  #date;
  #hits;
  #percentage;
  #finalScore;
  #words;
  #scoreDisplay;

  constructor(finalScore, words) {
    this.#finalScore = finalScore;
    this.#words = words;
    this.#date = new Date();
    this.#hits = 0;
    this.#percentage = 0;
    this.#scoreDisplay = document.getElementById("score-display");
    if (this.#scoreDisplay) {
      this.updateDisplay();
    }
  }

  get date() {
    return this.#date;
  }

  get hits() {
    return this.#hits;
  }

  get percentage() {
    if (this.#words.length === 0) {
      return 0;
    }
    return (this.#finalScore / this.#words.length) * 100;
  }

  set hits(value) {
    this.#hits = value;
    if (this.#scoreDisplay) {
      this.updateDisplay();
    }
  }

  set percentage(value) {
    this.#hits = this.#finalScore;
    this.#percentage = value;
    if (this.#scoreDisplay) {
      this.updateDisplay();
    }
  }

  updateDisplay() {
    if (this.#scoreDisplay) {
      this.#scoreDisplay.textContent = `Hits: ${this.#hits}, Percentage: ${
        this.#percentage
      }%`;
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayNewWord() {
  if (words.length === 0) {
    endGame();
    return;
  }
  const word = words.pop();
  wordsContainer.innerHTML = word;
  wordInput.value = "";
  if (word === wordsContainer.textContent.trim().toLowerCase()) {
    score++;
    scoreDisplay.textContent = score;
  }
}

function startGame() {
  if (isRunning) return;
  isRunning = true;
  bgMusic.play();
  words = shuffle(words);
  displayNewWord();
  score = 0;
  scoreDisplay.textContent = score;
  wordInput.disabled = false;
  wordInput.focus();
  intervalId = setInterval(() => {
    remainingTime--;
    timeDisplay.textContent = remainingTime;
    if (remainingTime === 0) {
      clearInterval(intervalId);
      endGame();
    }
  }, 1000);
}

function endGame() {
  isRunning = false;
  bgMusic.pause();
  const finalScore = score;
  const totalWords = finalScore + words.length;
  const gameScore = new Score(finalScore, totalWords);
  wordsContainer.innerHTML = `Game Over! ${"\n"} ${"<strong>"} Final Score: ${score} ${"</strong"}`;
  remainingTime = 99;
  score = 0;
  timeDisplay.textContent = remainingTime;
  scoreDisplay.textContent = score;
  wordInput.setAttribute("readonly", "");
  console.log(gameScore);
  handleLocalStorage(gameScore);
}

function handleLocalStorage(gameScore) {
  let previousScores = JSON.parse(localStorage.getItem("scores")) || [];
  let currentScore = {
    hits: gameScore.hits,
    percentage: gameScore.percentage,
    finalScore: gameScore.finalScore,
  };

  // Add the currentScore to the array of previous scores
  previousScores.push(currentScore);

  // Sort the array in descending order by the finalScore property
  previousScores.sort((a, b) => b.finalScore - a.finalScore);

  // Limit the array to the top 10 scores
  previousScores.splice(10);

  // Store the updated array in localStorage
  localStorage.setItem("scores", JSON.stringify(previousScores));
}

// Display the scoreboard on page load
window.addEventListener("load", () => {
  let previousScores = JSON.parse(localStorage.getItem("scores")) || [];

  // Display the Top results
  let resultArr =
    "<h2>Top results:</h2><div style='display:flex; flex-direction:column; justify-content:center; align-items:center'>";
  for (let i = 0; i < Math.min(previousScores.length, 10); i++) {
    let percentage = previousScores[i].percentage
      ? previousScores[i].percentage.toFixed(2)
      : "N/A";
    resultArr += `<p style='margin: 10px'>#${i + 1}: ${
      previousScores[i].finalScore
    } words ${percentage}%</p>`;
  }

  resultArr += "</div>";
  document.getElementById("score-display").innerHTML = resultArr;
});

function startGame() {
  if (isRunning) return;
  isRunning = true;
  bgMusic.play();
  words = shuffle(words);
  displayNewWord();
  score = 0;
  scoreDisplay.textContent = score;
  wordInput.disabled = false;
  wordInput.focus();
  intervalId = setInterval(() => {
    remainingTime--;
    timeDisplay.textContent = remainingTime;
    if (remainingTime === 0) {
      clearInterval(intervalId);
      endGame();
    }
  }, 1000);
}

restartBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  isRunning = true;
  remainingTime = 99;
  score = 0;
  words = shuffle(words);
  displayNewWord();
  wordInput.focus();
  timeDisplay.textContent = remainingTime;
  scoreDisplay.textContent = score;
  startBtn.textContent = "Restart";
  bgMusic.currentTime = 0;
  scoreDisplay.textContent = 0;
  intervalId = setInterval(() => {
    remainingTime--;
    timeDisplay.textContent = remainingTime;
    if (remainingTime === 0) {
      clearInterval(intervalId);
      endGame();
    }
  }, 1000);
});

// const startBtn = document.getElementById("start-btn");
// const wordInput = document.getElementById("word-input");

wordInput.addEventListener("keydown", (event) => {
  if (!isRunning) {
    event.preventDefault(); // Prevent text input before game starts
  }
});

startBtn.addEventListener("click", () => {
  startGame();
  bgMusic.play();
  wordInput.removeAttribute("readonly");
  startBtn.style.display = "none";
  restartBtn.style.display = "block";
});

// pauseBtn.addEventListener("click", pauseGame);

wordInput.addEventListener("input", () => {
  const wordEntered = wordInput.value.trim().toLowerCase();
  const currentWord = wordsContainer.textContent.trim().toLowerCase();
  if (wordEntered === currentWord) {
    displayNewWord();
  }
});
