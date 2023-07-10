// Quiz questions
const questions = [
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: 1,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    answer: 0,
  },
  {
    question: "Which HTML tag is used to link an external JavaScript file?",
    options: ["<script>", "<link>", "<js>", "<javascript>"],
    answer: 0,
  },
  {
    question:
      "In CSS, which property is used to change the background color of an element?",
    options: ["color", "background-color", "bg-color", "bgcolor"],
    answer: 1,
  },
  {
    question: "What is the correct syntax for a JavaScript comment?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment */",
      "%% This is a comment %%",
    ],
    answer: 1,
  },
  {
    question: "Which HTML tag is used to define a table row?",
    options: ["<row>", "<tr>", "<th>", "<td>"],
    answer: 1,
  },
  {
    question:
      "In CSS, which property is used to change the text color of an element?",
    options: ["text-color", "color", "font-color", "text-style"],
    answer: 1,
  },
  {
    question:
      "Which JavaScript method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "Which CSS property is used to create space between elements?",
    options: ["margin", "padding", "space", "border"],
    answer: 0,
  },
  {
    question: "Which HTML tag is used to define a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    answer: 1,
  },
  {
    question: "In JavaScript, which loop is used to iterate over an array?",
    options: ["for", "while", "do-while", "foreach"],
    answer: 0,
  },
  {
    question: "What does the CSS property 'display: none;' do?",
    options: [
      "Hides an element",
      "Shows an element",
      "Increases element visibility",
      "Resizes an element",
    ],
    answer: 0,
  },
  {
    question:
      "Which HTML tag is used to define the heading with the highest priority?",
    options: ["<h1>", "<h2>", "<h3>", "<h4>"],
    answer: 0,
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    options: ["==", "===", "!=", "!=="],
    answer: 1,
  },
  {
    question:
      "In CSS, which property is used to specify the font size of an element?",
    options: ["font-size", "text-size", "font-style", "text-style"],
    answer: 0,
  },
];

// Global variables
let currentQuestionIndex = 0;
let time = 60;
let score = 0;
let timerInterval;

// Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const questionElement = document.getElementById("question");
const optionsList = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");

// Function to start the quiz
function startQuiz() {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  displayQuestion();
  startTimer();
}

// Function to display a question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  optionsList.innerHTML = "";
  question.options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = option;
    listItem.addEventListener("click", () => checkAnswer(index));
    optionsList.appendChild(listItem);
  });
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  if (selectedIndex === question.answer) {
    feedbackElement.textContent = "Correct!";
    score++;
  } else {
    feedbackElement.textContent = "Wrong!";
    time -= 10;
    if (time < 0) time = 0;
    timeElement.textContent = time;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeElement.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizScreen.style.display = "none";
  endScreen.style.display = "block";
  scoreElement.textContent = score;

  // Hide timer
  timeElement.style.display = "none";

  // Save score and user name to local storage
  initialsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      saveScore(initials, score);
    }
  });
}

// Function to save score and user name to local storage
function saveScore(initials, score) {
  const highScores = getHighScores();
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  console.log("Score saved to local storage.");
}

// Function to get high scores from local storage
function getHighScores() {
  const highScores = localStorage.getItem("highScores");
  return highScores ? JSON.parse(highScores) : [];
}

// Event listener for starting the quiz
document.getElementById("start-btn").addEventListener("click", startQuiz);
