const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const quitButton = document.getElementById("quit-btn");
const name = document.getElementById("name");
const thanks = document.getElementById("thanks");
const end = document.getElementById("end");
const questionContainerElement = document.getElementById("question-ctn");
const questionElement = document.getElementById("question");
const answerButtonsElements = document.getElementById("answer-btns");
//added these so questions are shuffled
//defaults them to undefined
let shuffledQuestions, currentQuestionIndex, score;
const total = 8;
///////////////////////////////////////////////////
//                  Click Events                 //
///////////////////////////////////////////////////
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
quitButton.addEventListener("click", endGame);
///////////////////////////////////////////////////
//                  Functions                   //
///////////////////////////////////////////////////
function startGame() {
  startButton.classList.add("hide");
  name.classList.add("hide");
  //sort method and math.random will sort questions each time game is played
  //if negative number will sort one way, if positive number will sort different way
  //Math.random gives number between 0 and 1, and -5 will manipulate that range to be neg/pos
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove("hide");
  answerButtonsElements.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  //sets the text to the actual question from the questions array
  questionElement.innerText = question.question;
  //basically creating new buttons for the answers from the questions array
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    //sets the text to the text from the answers array
    button.innerText = answer.text;
    //adding the btn class so that it is styled like the other buttons
    button.classList.add("btn");
    button.classList.add("ans-opt");
    if (answer.correct) {
      //add data attribute of correct only for true/correct answer, easier to konw which is correct
      button.dataset.correct = answer.correct;
    }
    //
    button.addEventListener("click", selectAnswer);

    answerButtonsElements.appendChild(button);
  });
}

function resetState() {
  questionElement.classList.remove("hide");
  nextButton.classList.add("hide");
  quitButton.classList.add("hide");
  end.classList.add("hide");
  thanks.classList.add("hide");
  //basically removing the answers 1-4 so it's empty and we don't see, only the new answers from the questions array will display
  while (answerButtonsElements.firstChild) {
    answerButtonsElements.removeChild(answerButtonsElements.firstChild);
  }
}

function selectAnswer(e) {
  let value = "";
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  Array.from(answerButtonsElements.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) {
    //adds 1 to score if answer is correct
    score++;
    value =
      score > 6
        ? "You must be my best friend!!"
        : "HML, cause you don't know me!!";
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    //keeping count of correct answers
  } else {
    startButton.innerText = "Take Again?";
    startButton.classList.remove("hide");
    quitButton.classList.remove("hide");
    questionElement.classList.add("hide");

    end.classList.remove("hide");
    end.innerHTML = "You got " + score + " out of 8 right! " + value;
  }
}

function endGame() {
  questionElement.classList.add("hide");
  answerButtonsElements.classList.add("hide");
  // startButton.classList.add("hide");
  quitButton.classList.add("hide");
  thanks.classList.remove("hide");
  startButton.innerText = "Start Quiz";
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element, correct) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

//create array object to hold questions that will be shown
const questions = [
  {
    question: "What year was I born?",
    // create an array object for answers, since it always before 4
    answers: [
      {
        text: "1983",
        correct: false,
      },
      {
        text: "1984",
        correct: false,
      },
      {
        text: "1985",
        correct: true,
      },
      {
        text: "1986",
        correct: false,
      },
    ],
  },
  {
    question: "What is the correct spelling of my middle name?",
    answers: [
      {
        text: "Doracell",
        correct: false,
      },
      {
        text: "Dorcell",
        correct: true,
      },
      {
        text: "Duracell",
        correct: false,
      },
      {
        text: "Dorcelle",
        correct: false,
      },
    ],
  },
  {
    question: "What month did I graduate college?",
    // create an array object for answers, since it always before 4
    answers: [
      {
        text: "May",
        correct: false,
      },
      {
        text: "June",
        correct: false,
      },
      {
        text: "August",
        correct: true,
      },
      {
        text: "December",
        correct: false,
      },
    ],
  },
  {
    question: "I am right-handed?",
    answers: [
      {
        text: "True",
        correct: false,
      },
      {
        text: "False",
        correct: true,
      },
    ],
  },
  {
    question: "What is my favorite color?",
    answers: [
      {
        text: "Red",
        correct: false,
      },
      {
        text: "Black",
        correct: true,
      },
      {
        text: "Pink",
        correct: false,
      },
      {
        text: "Blue",
        correct: false,
      },
    ],
  },
  {
    question: "What is my favorite candy?",
    answers: [
      {
        text: "Snickers",
        correct: true,
      },
      {
        text: "Jolly Ranchers",
        correct: false,
      },
      {
        text: "Twix",
        correct: false,
      },
      {
        text: "Starbursts",
        correct: false,
      },
    ],
  },
  {
    question: "My brother is 5 years older than me?",
    answers: [
      {
        text: "True",
        correct: true,
      },
      {
        text: "False",
        correct: false,
      },
    ],
  },
  {
    question: "How many tattoos do I have?",
    answers: [
      {
        text: "5",
        correct: false,
      },
      {
        text: "9",
        correct: false,
      },
      {
        text: "10",
        correct: true,
      },
      {
        text: "12",
        correct: false,
      },
    ],
  },
];
