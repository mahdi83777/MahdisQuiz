// Get elements from HTML by ID
var quizbdy = document.getElementById("quiz");
var results = document.getElementById("result");
var finalScore = document.getElementById("finalScore");
var gameover = document.getElementById("gameover");
var questions = document.getElementById("questions");
var quizTime = document.getElementById("timer");
var startQuizBtn = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreCont = document.getElementById("highscoreCont");
var endGameBtn = document.getElementById("endGameBtns");
var scoreBtn = document.getElementById("submitScore");
var highscoreDisplay = document.getElementById("highscores");
var highscoreDiv = document.getElementById("highscorePage");
var highscoreInpName = document.getElementById("inits");
var highscoreDisplName = document.getElementById("highscoreinit");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
// Quiz question object
var quizQ = [{
    question: "What does HTML stand for?",
    choiceA: "Hypertext Markup Language",
    choiceB: "Home Tool Markup Language",
    choiceC: "Hyperlinks and Text Markup Language",
    choiceD: "None of the above",
    correctAnswer: "a"},
  {
    question: "What does DOM stand for?",
    choiceA: "Digital Ordinance Model",
    choiceB: "Display Object Management",
    choiceC: "Document Object Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "c"},
   {
    question: "What does CSS stand for?",
    choiceA: "Cascading Style Sheets",
    choiceB: "Color Style Sheets",
    choiceC: "Cascade Sheets Style",
    choiceD: "Cascade Style Sheet",
    correctAnswer: "a"},
    {
    question: "How do we comment in Javascript?",
    choiceA: "/*",
    choiceB: "<>",
    choiceC: "/",
    choiceD: "//",
    correctAnswer: "d"},
    {
    question: "How do we print something to the console?",
    choiceA: "console.print()",
    choiceB: "print()",
    choiceC: "console.log()",
    choiceD: "print.console()",
    correctAnswer: "c"},  
    {
    question: "Which of the following is not a valid Javascript variable name?",
    choiceA: "5name",
    choiceB: "_firstname",
    choiceC: "firstname",
    choiceD: "None of the above",
    correctAnswer: "a"},
    {
    question: "Which tag is an extension to HTML that can enclose a Javascript statement?",
    choiceA: "&lt;BODY&gt;",
    choiceB: "&lt;DIV&gt;",
    choiceC: "&lt;HEADER&gt;",
    choiceD: "&lt;SCRIPT&gt;",
    correctAnswer: "d"},
    
    ];

// Global variables
var finalQIndex = quizQ.length;
var currentQIndex = 0
var score = 0;
var correct;
var timeLeft = 60;
var timerInterval;


// function to cycle through the object array containing the quiz questions and generate the questions/answers.
function generateQuizQ(){
    gameover.style.display = "none";
    if (currentQIndex === finalQIndex){
        return showScore();
    } 
    var currentQ = quizQ[currentQIndex];
    questions.innerHTML = "<p>" + currentQ.question + "</p>";
    btnA.innerHTML = currentQ.choiceA;
    btnB.innerHTML = currentQ.choiceB;
    btnC.innerHTML = currentQ.choiceC;
    btnD.innerHTML = currentQ.choiceD;
};

// Hide start button, start time and quiz
function startQuiz(){
    gameover.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQ();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTime.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizbdy.style.display = "block";
}

// Displays scores after time runs out or quiz is completed
function showScore(){
    quizbdy.style.display = "none"
    gameover.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInpName.value = "";
    finalScore.innerHTML = "you scored " + score + "/" + quizQuestions.length;
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
scoreBtn.addEventListener("click", function highscore() {
    
    
    if (highscoreInpName.value === "") {
        alert("Must enter initials");
        return false;
    }
    else {
        var savedscore = JSON.parse(localStorage.getItem("savedHighscore")) || [];
        var user = highscoreInpName.value.trim();
        var currentscore = {
            name : user,
            score : score
        };
    
        gameover.style.display = "none";
        highscoreCont.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtn.style.display = "flex";
        
        savedscore.push(currentscore);
        localStorage.setItem("savedHighscore", JSON.stringify(savedscore));
        generatescores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generatescores() {
    highscoreDisplName.innerHTML = "";
    highscoreDisplay.innerHTML = "";

    var highscores = JSON.parse(localStorage.getItem("savedHighscore")) || [];
    for (i=0; i < highscores.length; i++){
        var nameSpan = document.createElement("li");
        var scoreSpan = document.createElement("li");
        nameSpan.textContent = highscores[i].name;
        scoreSpan.textContent = highscores[i].score;
        highscoreDisplName.appendChild(nameSpan);
        highscoreDisplay.appendChild(scoreSpan);
    }
}

// displays scores and hides the others
function showHighscores(){

    startQuizDiv.style.display = "none"
    gameover.style.display = "none";
    highscoreCont.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtn.style.display = "flex";
    generatescores();
}

// clears local storage
function clearScores() {
    window.localStorage.clear();
    highscoreDisplName.textContent = "";
    highscoreDisplay.textContent = "";
}

// set all variables back to original to restart
function replayQ() {
    highscoreCont.style.display = "none";
    gameover.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQIndex = 0;
}

// check each answer if correct
function checkAns(answer){
    correct = quizQ[currentQIndex].correctAnswer;

    if (answer === correct && currentQIndex !== finalQIndex) {
        score++;
        alert("Correct");
        currentQIndex++;    //increment current question index
        generateQuizQ();
    }
    else if (answer !== correct && currentQIndex !== finalQIndex) {
        alert("Incorrect")
        currentQIndex++;
        generateQuizQ();
    }
    else {
        showScore();
    }
}

// Button to start quiz
startQuizBtn.addEventListener("click",startQuiz);