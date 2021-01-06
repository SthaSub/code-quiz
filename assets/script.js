/**
 * Declaration of Question Arrays with options, and answer.
 */
var questions = [
    {
        key: 1,
        question: "Q1. What is the fullform of HTML?",
        answer: "Hyper Text Markup Language",
        options: ["Hypersonic Type Markup Language", "Hyper Text Markup Language",
            "High Text Modern Language", "None of these"]
    },
    {
        key: 2,
        question: "Q2. What is Fullform of CSS?",
        answer: "Cascading Style Sheet",
        options: ["None of these", "Code Style Sheet", "Cascade Short Sheet ", "Cascading Style Sheet"]

    },
    {
        key: 3,
        question: "Q3. What is the Fullform of GMAIL?",
        answer: "Google Mail",
        options: ["None of these", "Gadget Mailing", "Google Mail", "Go Mail"]

    },
    {
        key: 4,
        question: "Q4. What is the Fullform of OS?",
        answer: "Operating System",
        options: ["Operation System", "Operating System", "Opcode System", "None of these"]
    },
    {
        key: 5,
        question: "Q5. What is the fullform of JS",
        answer: "Javascript",
        options: ["Javascript", "None of these", "Jazzscript", "Joinscript"]
    }
];


/**
 * Main program starts from here 
 */

var startQuiz = document.querySelector("#start");
var ques = document.querySelector(".question");
var questionCounter = 0;
var nextQuestion = document.querySelector("#next-question");
var iconCorrect = document.createElement("i");
var iconWrong = document.createElement("i");
var correctAnswer;
var select;
var timerSecond = document.querySelector("header .quiz-time .second");
var timeOfSec;
var seconds;
var gamePoints = 0;
var viewHighScore = document.querySelector(".score");
var resultForm;
var inputText;
var displayResult;
var submitButton;

/**
 * direct the quiz page after start button pressed 
 */
function start(event) {
    event.preventDefault();
    location.href = "./quiz.html";
}
