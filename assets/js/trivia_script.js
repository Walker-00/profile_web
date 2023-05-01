document.addEventListener("DOMContentLoaded", () => {
  const question = document.querySelector("#question");
  const choices = Array.from(document.querySelectorAll(".choice"));
  const feedback = document.querySelector("#feedback");

  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let status;
  let questionCounter = 0;
  let availableQuestions = [];

  let questions = [
    {
      question: "What is the capital of Old Burma?",
      choice1: "Rangoon",
      choice2: "Mandalay",
      choice3: "Naypyidaw",
      answer: 1,
    },
    {
      question: "What is the highest mountain in the world?",
      choice1: "Mount Kilimanjaro",
      choice2: "Mount Everest",
      choice3: "Mount Fuji",
      answer: 2,
    },
    {
      question: "What is the largest country in the world?",
      choice1: "Russia",
      choice2: "China",
      choice3: "India",
      answer: 1,
    },
  ];

  const SCORE_POINTS = 100;
  const MAX_QUESTIONS = 3;

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
  };

  getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      if (score === 0) {
        status = "You Lose!";
      }
      else if (score === 100) {
        status = "Try Harder!";
      }
      else if (score === 200) {
        status = "Not Bad!";
      }
      else if (score === 300) {
        status = "OMG!";
      }
      else {
        "WTF!";
      }
      alert(status);
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        incrementScore(SCORE_POINTS);
      }

      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        feedback.innerText = "";
        getNewQuestion();
      }, 1000);
    });
  });

  incrementScore = (num) => {
    score += num;
    document.querySelector("#score").innerText = score;
  };

  startGame();

  const answerInput = document.querySelector("#answer-input");
  const confirmBtn = document.querySelector("#confirm-btn");

  confirmBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.toLowerCase().trim();
    const correctAnswer = "yes";

    if (userAnswer === correctAnswer) {
      answerInput.classList.add("correct");
      alert("Correct!");
    } else {
      answerInput.classList.add("incorrect");
      alert("Incorrect!");
    }
  });
});
