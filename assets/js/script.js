var startButton = document.querySelector(".start-btn");
var startContainer = document.querySelector(".start-container");
var questionElement = document.getElementById("question");
var container = document.querySelector(".container");
var questionsContainer = document.querySelector(".question-container");
var allDoneContainer = document.querySelector(".alldone-container");
var highscoresContainer = document.querySelector(".highscores-container");
var answerButton = document.querySelector("ans-btn");

// questions
var questionOne = document.querySelector(".question-one");
var questionTwo = document.querySelector(".question-two");
var questionThree = document.querySelector(".question-three");
var questionFour = document.querySelector(".question-four");
var questionFive = document.querySelector(".question-five");




startButton.addEventListener("click", startGame);

function startGame() {
    startContainer.classList.add("hide");
    questionOne.classList.remove("hide");
    isWin = false;
    timerCount = 10;
    startTimer()
}

container.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(".ans-btn")) {
        var state = element.getAttribute("data-check");

        if (state === "correctOne") {
            questionOne.classList.add("hide");
            questionTwo.classList.remove("hide");
        } else if (state === "correctTwo") {
            questionTwo.classList.add("hide");
            questionThree.classList.remove("hide");
        } else if (state === "correctThree") {
            questionThree.classList.add("hide");
            questionFour.classList.remove("hide");
        } else if (state === "correctFour") {
            questionFour.classList.add("hide");
            questionFive.classList.remove("hide");
        } else if (state === "correctFive") {
            questionFive.classList.add("hide");
            allDoneContainer.classList.remove("hide");
        }
    }
});

// Highscores section

var initialsInput = document.querySelector("#initials-text")
var submitButton = document.querySelector("#submit-btn");
var clearButton = document.querySelector(".clear-btn");
var highscoreList = document.querySelector(".highscore-list");
var viewHighscores = document.querySelector(".view-highscores");
var goBackButton = document.querySelector(".go-back-btn")

var highscores = [];

function renderhighscores() {
    highscoreList.innerHTML = "";
        
    for (var i = 0; i < highscores.length; i++) {
      var highscore = highscores[i];
  
      var li = document.createElement("li");
      li.textContent = highscore;
      li.setAttribute("data-index", i);
  
      highscoreList.appendChild(li);
    }
  }
  
  function init() {
    var storedhighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedhighscores !== null) {
      highscores = storedhighscores;
    }
    renderhighscores();
  }
  
  function storehighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
  submitButton.addEventListener("click", function(event) {
    allDoneContainer.classList.add("hide");
    highscoresContainer.classList.remove("hide");
    var todoText = initialsInput.value.trim();
    if (todoText === "") {
      return;
    }
    highscores.push(todoText);
    initialsInput.value = "";
   
    storehighscores();
    renderhighscores();
  });
  
  clearButton.addEventListener("click", function() {
    highscores = [];
    storehighscores();
    renderhighscores();
  });
  
  init();

  viewHighscores.addEventListener("click", function() {
    startContainer.classList.add("hide");
    questionsContainer.classList.add("hide");
    allDoneContainer.classList.add("hide");
    highscoresContainer.classList.remove("hide")
  })

  goBackButton.addEventListener("click", function() {
    window.location.reload();
  })

// Timer

function loseGame() {
    questionsContainer.classList.add("hide");
    allDoneContainer.classList.remove("hide");
  }
  
  // The setTimer function starts and stops the timer and triggers winGame() and loseGame()
  var timerElement = document.querySelector(".timer-count");
  var isWin = false;
  var timer;
  var timerCount;

  function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }
