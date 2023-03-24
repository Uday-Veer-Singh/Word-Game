"use strict";

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

const wordInput = document.getElementById("word-input");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
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

let remainingTime = 100;
let score = 0;
let isRunning = false;
let intervalId;
let gameStarted = false;

// class for the outcomes
class Score {
  #date;
  #hits;
  #percentage;

  // Use '_' because it is publicly in JS and '#' is used in private fields
  constructor() {
    this._date = new Date();
    this._hits = 0;
    this._percentage = 0;
    this._scoreDisplay = document.getElementById("score-display");
    if (this._scoreDisplay) {
      this.updateDisplay();
    }
  }

  get date() {
    return this._date;
  }

  get hits() {
    return this._hits;
  }

  get percentage() {
    return this._percentage;
  }

  set hits(value) {
    this._hits = value;
    if (this._scoreDisplay) {
      this.updateDisplay();
    }
  }

  set percentage(value) {
    this._percentage = value;
    if (this._scoreDisplay) {
      this.updateDisplay();
    }
  }

  updateDisplay() {
    if (this._scoreDisplay) {
      this._scoreDisplay.textContent = `Hits: ${this._hits}, Percentage: ${this._percentage}%`;
    }
  }
}

// shuffling the words in array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// function for displaying new word if the entered word is same as pop-up word
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
  intervalId = setInterval(() => {
    remainingTime--;
    timeDisplay.textContent = remainingTime;
    if (remainingTime === 0) {
      clearInterval(intervalId);
      endGame();
    }
  }, 1000);
}
