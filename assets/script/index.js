"use strict";

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
