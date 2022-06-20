var startButton = document.querySelector(".start-btn");
var startContainer = document.querySelector(".start-container");
var questionElement = document.getElementById("question");
var container = document.querySelector(".container");
var questionsContainer = document.querySelectorAll(".question-container");
var allDoneContainer = document.querySelector(".alldone-container");
var highscoresContainer = document.querySelector(".highscores-container");
var answerButton = document.querySelector("ans-btn");
var correctDisplay = document.querySelector(".correct");
var wrongDisplay = document.querySelector(".wrong");
var timerScore = document.querySelector(".timer-score");
var initialsInput = document.querySelector("#initials-text")
var submitButton = document.querySelector("#submit-btn");
var clearButton = document.querySelector(".clear-btn");
var highscoreList = document.querySelector(".highscore-list");
var viewHighscores = document.querySelector(".view-highscores");
var goBackButton = document.querySelector(".go-back-btn")
var timerElement = document.querySelector(".timer-count");
var isWin = false;
var timer;
var timerCount;

// questions
var questionOne = document.querySelector(".question-one");
var questionTwo = document.querySelector(".question-two");
var questionThree = document.querySelector(".question-three");
var questionFour = document.querySelector(".question-four");
var questionFive = document.querySelector(".question-five");

// start game
startButton.addEventListener("click", startGame);

function startGame() {
    startContainer.classList.add("hide");
    questionOne.classList.remove("hide");
    isWin = false;
    timerCount = 30;
    startTimer()
}
// next question
container.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches(".ans-btn")) {
        var state = element.getAttribute("data-check");

        if (state === "correctOne") {
            questionOne.classList.add("hide");
            questionTwo.classList.remove("hide");
            correctAnswer()
        } else if (state === "correctTwo") {
            questionTwo.classList.add("hide");
            questionThree.classList.remove("hide");
            correctAnswer()
        } else if (state === "correctThree") {
            questionThree.classList.add("hide");
            questionFour.classList.remove("hide");
            correctAnswer()
        } else if (state === "correctFour") {
            questionFour.classList.add("hide");
            questionFive.classList.remove("hide");
            correctAnswer()
        } else if (state === "correctFive") {
            questionFive.classList.add("hide");
            allDoneContainer.classList.remove("hide");
            correctAnswer()
            isWin = true
            scoreUpdate()
        } else if (state === "wrongOne") {
            questionOne.classList.add("hide");
            questionTwo.classList.remove("hide");
            timePenalty()
            wrongAnswer()
        } else if (state === "wrongTwo") {
            questionTwo.classList.add("hide");
            questionThree.classList.remove("hide");
            timePenalty()
            wrongAnswer()
        } else if (state === "wrongThree") {
            questionThree.classList.add("hide");
            questionFour.classList.remove("hide");
            timePenalty()
            wrongAnswer()
        } else if (state === "wrongFour") {
            questionFour.classList.add("hide");
            questionFive.classList.remove("hide");
            timePenalty()
            wrongAnswer()
        } else if (state === "wrongFive") {
            questionFive.classList.add("hide");
            allDoneContainer.classList.remove("hide");
            timePenalty()
            wrongAnswer()
            isWin = true
            scoreUpdate()
        }
    }
});
// checking answer
function correctAnswer() {
    correctDisplay.classList.remove("hide");
    setTimeout(function () {
        correctDisplay.classList.add("hide");
    }, 1000);
};

function wrongAnswer() {
    wrongDisplay.classList.remove("hide");
    setTimeout(function () {
        wrongDisplay.classList.add("hide");
    }, 1000);
};

// highscores section
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
submitButton.addEventListener("click", function () {
    allDoneContainer.classList.add("hide");
    highscoresContainer.classList.remove("hide");
    var highscoreText = initialsInput.value.trim();
    if (highscoreText === "") {
        return;
    }
    highscores.push(highscoreText + " - " + timerCount);

    initialsInput.value = "";

    storehighscores();
    renderhighscores();
});

clearButton.addEventListener("click", function () {
    highscores = [];
    storehighscores();
    renderhighscores();
});

init();

viewHighscores.addEventListener("click", function () {
    clearInterval(timer)
    startContainer.classList.add("hide");
    questionsContainer.forEach(
        function(node) {
            node.classList.add("hide");
        }
    );
    allDoneContainer.classList.add("hide");
    highscoresContainer.classList.remove("hide")
})

goBackButton.addEventListener("click", function () {
    window.location.reload();
})

// timer

function loseGame() {
    questionsContainer.forEach(
        function(node) {
            node.classList.add("hide");
        }
    )
    allDoneContainer.classList.remove("hide");
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                
                clearInterval(timer);
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function scoreUpdate() {
    timerScore.textContent = timerCount - 1;
}

function timePenalty() {
    timerCount = timerCount - 10;
}