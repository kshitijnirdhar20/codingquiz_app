const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Text Machine Language",
    ],
    answer: 2,
  },
  {
    question: "Which programming language is known as the mother of all languages?",
    options: ["JavaScript", "Java", "C", "Python"],
    answer: 2,
  },
  {
    question: "Which of the following is NOT a programming language?",
    options: ["HTML", "Ruby", "Java", "Python"],
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
]

let currentQuestion = 0
let score = 0
let timer
let timeLeft = 30
let questionAnswered = false


function initQuiz() {
  loadQuestion()
  startTimer()
  updateQuestionCounter()
}


function loadQuestion() {
  const questionElement = document.getElementById("question")
  const optionButtons = document.querySelectorAll(".option-btn")
  const progressBar = document.getElementById("progress")

 
  questionAnswered = false
  resetTimer()


  questionElement.innerText = questions[currentQuestion].question

  
  optionButtons.forEach((button, index) => {
    button.innerText = questions[currentQuestion].options[index]
    button.classList.remove("selected", "correct", "incorrect")
    button.disabled = false

  
    button.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`
    button.style.opacity = "0"
  })


  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`
}


function updateQuestionCounter() {
  document.getElementById("current-question").textContent = currentQuestion + 1
  document.getElementById("total-questions").textContent = questions.length
}

// timer start karo
function startTimer() {
  timeLeft = 30
  document.getElementById("timer").textContent = timeLeft

  timer = setInterval(() => {
    timeLeft--
    document.getElementById("timer").textContent = timeLeft

    // Visual feedback as time runs low
    if (timeLeft <= 10) {
      document.getElementById("timer").style.color = "#ef4444"
    } else {
      document.getElementById("timer").style.color = ""
    }

    // Time's up
    if (timeLeft <= 0) {
      clearInterval(timer)
      if (!questionAnswered) {
        handleTimeUp()
      }
    }
  }, 1000)
}

// Reset time
function resetTimer() {
  clearInterval(timer)
  timeLeft = 30
  document.getElementById("timer").textContent = timeLeft
  document.getElementById("timer").style.color = ""
  startTimer()
}


function handleTimeUp() {
  const optionButtons = document.querySelectorAll(".option-btn")
  const correctAnswer = questions[currentQuestion].answer

 
  optionButtons.forEach((button) => {
    button.disabled = true
  })

  optionButtons[correctAnswer].classList.add("correct")

  questionAnswered = true
}


function checkAnswer(selectedIndex) {
  if (questionAnswered) return

  questionAnswered = true
  clearInterval(timer)

  const optionButtons = document.querySelectorAll(".option-btn")
  const correctAnswer = questions[currentQuestion].answer


  optionButtons[selectedIndex].classList.add("selected")

  optionButtons.forEach((button) => {
    button.disabled = true
  })

  optionButtons.forEach((button, index) => {
    if (index === correctAnswer) {
      button.classList.add("correct")
    } else if (index === selectedIndex && selectedIndex !== correctAnswer) {
      button.classList.add("incorrect")
    }
  })

  
  if (selectedIndex === correctAnswer) {
    score++
    playCorrectSound()
  } else {
    playIncorrectSound()
  }
}


function playCorrectSound() {

  console.log("Correct answer!")
}


function playIncorrectSound() {
  
  console.log("Incorrect answer!")
}


function nextQuestion() {
  if (!questionAnswered) {
  
    handleTimeUp()
    return
  }

  currentQuestion++
  if (currentQuestion < questions.length) {
    loadQuestion()
    updateQuestionCounter()
  } else {
    
    localStorage.setItem("score", score)
    window.location.href = "results.html"
  }
}


window.onload = initQuiz

