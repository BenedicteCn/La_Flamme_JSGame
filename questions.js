const questions = [
  {
    question:
      "Which animal saved Soraya's life by allowing her to receive a heart transplant?",
    answers: {
      a: "A dog",
      b: "A monkey",
      c: "A fish",
      d: "A pig",
    },
    correct: "b",
  },
  {
    question: "What is Marc's profession?",
    answers: {
      a: "He is a drone pilot",
      b: "He is a rally pilot",
      c: "He is a plane pilot",
      d: "He is a Formula 1 driver",
    },
    correct: "c",
  },
  {
    question: "How many contestants does Marc have?",
    answers: {
      a: "12",
      b: "13",
      c: "14",
      d: "15",
    },
    correct: "b",
  },
  {
    question: "What is the name of the therapist who follows Marc?",
    answers: {
      a: "Dr. Juiphe",
      b: "Dr. Love",
      c: "Dr. Grey",
      d: "Dr. Phil",
    },
    correct: "a",
  },
  {
    question: "Which candidate does Marina fall in love with?",
    answers: {
      a: "Emilie",
      b: "Alexandra",
      c: "Anne",
      d: "Soraya",
    },
    correct: "d",
  },
  {
    question: "Which contestant has been cheating on Marc all season?",
    answers: {
      a: "Chatalère",
      b: "Anne",
      c: "Manon",
      d: "Emilie",
    },
    correct: "a",
  },
  {
    question:
      "Which candidate dies during the sports tests concocted by Marc and Tony Tonic, his sports coach?",
    answers: {
      a: "Soraya",
      b: "Anne",
      c: "Manon",
      d: "Emilie",
    },
    correct: "a",
  },
];

let currentQuestion = null;
let currentPlayer = null;

function setupQuestionModalEventListeners() {
  const modalQuiz = document.getElementById("myModalQuizz");
  const closeQuestion = document.querySelector("button#close-question");

  closeQuestion.addEventListener("click", function () {
    modalQuiz.style.display = "none";
    document.getElementById("empty").innerHTML = "";
  });

  const answers = document.getElementById("answers-buttons");

  answers.addEventListener("click", (event) => {
    const selectedAnswer = event.target.dataset.option;
    if (!selectedAnswer) {
      return;
    }
    if (selectedAnswer === currentQuestion.correct) {
      currentPlayer.addAdditionalSteps(5);
      console.log(currentPlayer.steps);

      document.getElementById("empty").innerHTML =
        "Good answer! you win +5 steps";
    } else {
      document.getElementById("empty").innerHTML =
        "Loser! You don't win anything";
    }
  });
}

function setupQuestion(question, player) {
  currentQuestion = question;
  currentPlayer = player;

  const buttonA = document.getElementById("button-a");
  const buttonB = document.getElementById("button-b");
  const buttonC = document.getElementById("button-c");
  const buttonD = document.getElementById("button-d");

  document.getElementById("myModalQuizz").style.display = "block";
  document.getElementById("quiz-question").textContent =
    currentQuestion.question;
  document.getElementById("quiz-question").style.fontWeight = 500;
  document.getElementById("quiz-question").style.fontSize = "24px";
  buttonA.innerHTML = currentQuestion.answers.a;
  buttonB.innerHTML = currentQuestion.answers.b;
  buttonC.innerHTML = currentQuestion.answers.c;
  buttonD.innerHTML = currentQuestion.answers.d;
}
