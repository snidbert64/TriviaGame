var timeLimit = 20;
var qNumber = 0;
var timer = timeLimit;
var timerInterval;

var correctAnswers;
var incorrectAnswers;
var timeouts;

var questions = [
    {
        qText: "What is Spider-Man's real name?",
        answers: ["Miles Morales", "Gerry Drew", "Peter Parker", "Miguel O'Hara", "Max Borne", "Takuya Yamashiro"],
        correct: "Peter Parker",
        flavor: "Technically, you can't really get this one wrong because all the other answers are actually other versions of Spider-Man."
    },
    {
        qText: "What is Peter Parker's middle name?",
        answers: ["Benjamin", "Richard", "Benedict", "Preston"],
        correct: "Benjamin",
        flavor: "Named for his late Uncle Ben."
    },
    {
        qText: "How many Spider-Man movies have been released? (As of December 2018)",
        answers: [ "3", "6", "7", "11"],
        correct: "11",
        flavor: "Three movies based on a TV show from the late 70s, one based on the Japanese Spider-Man, three in a trilogy in the 2000s, two in the universe of a 2012 reboot, one in the Marvel Cinematic Universe, and one animated film featuring several different versions of Spider-Man."
    }
]

function playGame() {
    $("#main-menu").hide();
    $("#final-results").hide();
    state = "answering";
    timer = timeLimit;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timeouts = 0;
    qNumber = 0;
    question(0);

}


function question(number) {
    timer = timeLimit;
    $("#result-screen").hide();
    $("#question-screen").show();
    $("#possible-answers").html("<button class='guess'>" + questions[number].answers.join("</button><button class='guess'>") + "</button>");
    $("#timer").text(timer);
    $("#question-text").text(questions[number].qText);
    timerInterval = setInterval(function() {
        timer--;
        if (timer === -1) {
            results("");
        }
        $("#timer").text(timer);
    }, 1000);
    $(".guess").on("click", function() {
        console.log(this.innerHTML);
        results(this.innerHTML);
    });
}

function results(answer) {
    $("#result-screen").show();
    $("#question-screen").hide();
    clearInterval(timerInterval);
    $(".guess").off("click");
    if (answer === "") {
        timeouts++;
        $("#result").text("Time's Up!")
        $("#correct-answer").text("The correct answer was " + questions[qNumber].correct);
    } else if (answer === questions[qNumber].correct) {
        correctAnswers++;
        $("#result").text("Correct!");
        $("#correct-answer").text("");
    } else {
        incorrectAnswers++;
        $("#result").text("Incorrect!")
        $("#correct-answer").text("The correct answer was " + questions[qNumber].correct);
    }
    $("#flavor-text").text(questions[qNumber].flavor);
    setTimeout( function() {
        qNumber++;
        if (qNumber === questions.length) {
            finalResults();
        } else {
            question(qNumber);
        }
    }, 4000);
}

function finalResults() {
    console.log("Final Results!");
    $("#result-screen").hide();
    $("#question-screen").hide();
    $("#final-results").show();
    $("#right").text("Correct answers: " + correctAnswers);
    $("#wrong").text("Incorrect answers: " + incorrectAnswers);
    $("#pass").text("Unanswered : " + timeouts);
}