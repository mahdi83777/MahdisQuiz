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
var highscoreDiv = document.getElementById("highscorePage");
var highscoreInpName = document.getElementById("inits");
var highscoreDisplName = document.getElementById("highscoreinit");
var endGameBtn = document.getElementById("endGameBtns");
var scoreBtn = document.getElementById("submitScore");
var highscoreDisplay = document.getElementById("highscores");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
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
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
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
    choiceA: "<BODY>",
    choiceB: "<DIV>",
    choiceC: "<HEADER>",
    choiceD: "<SCRIPT>",
    correctAnswer: "d"},
    
    ];

// Other global variables
var finalQIndex = quizQuestions.length;
var currentQIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// function to cycle through the object array containing the quiz questions and generate the questions/answers.
function generateQuizQuestion(){
    gameover.style.display = "none";
    if (currentQIndex === finalQIndex){
        return showScore();
    } 
    var currentQ = quizQuestions[currentQIndex];
    questions.innerHTML = "<p>" + currentQ.question + "</p>";
    btnA.innerHTML = currentQ.choiceA;
    btnB.innerHTML = currentQ.choiceB;
    btnC.innerHTML = currentQ.choiceC;
    btnD.innerHTML = currentQ.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameover.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

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



// This button starts the quiz!
startQuizBtn.addEventListener("click",startQuiz);