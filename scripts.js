const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language","Home Tool Markup Language"," Hyper Text Markup Language","Hyper Text Machine Language"],
    answer: 2,
  },
  {
    question: "Which programming language is known as the mother of all languages",
    options: ["CSS", "Java", "C", "python"],
    answer: 1,
  },
  {
    question: "Which of the following is NOT a programming language?",
    options: ["HTML", "CSS", "Java", "Python"],
    answer: 0,
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets"],
    answer: 3,
  },
  {
    question: "Which of the following is used to style web pages?",
    options: ["CSS", "C", "Java", "HTML"],
    answer: 0,
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionButtons = document.querySelectorAll(".option-btn");
  const progressBar = document.getElementById("progress");

  questionElement.innerText = questions[currentQuestion].question;
  optionButtons.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index];
    button.classList.remove("selected", "correct", "incorrect"); 
    button.disabled = false;
  });

 
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function checkAnswer(selectedIndex) {
  const optionButtons = document.querySelectorAll(".option-btn");
  const correctAnswer = questions[currentQuestion].answer;


  optionButtons[selectedIndex].classList.add("selected");


  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  optionButtons.forEach((button, index) => {
    if (index === correctAnswer) {
      button.classList.add("correct");  
    } else if (index === selectedIndex) {
      button.classList.add("incorrect"); 
    }
  });

 
  if (selectedIndex === correctAnswer) {
    score++;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location.href = "results.html";
  }
}


window.onload = loadQuestion;