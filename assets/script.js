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

/**
 * this control function prepares the quiz challenge   
 */
function show() {
    clearInterval(timeOfSec);
    //counts question upto 5
    if (questionCounter == 5) {
        result();
    } else {
        correctAnswer = "";
        if (ques.lastChild !== null) { // prevents the appending the question in same page by clearing prevoius question
            ques.innerHTML = "";
        }
        var h2 = document.createElement("h2");
        var ul = document.createElement("ul");
        ul.className = "opt-grp";
        for (var i = 0; i < questions[questionCounter].options.length; i++) {
            var li = document.createElement("li");
            li.className = "option";
            li.textContent = questions[questionCounter].options[i];
            ul.append(li);
        }
        h2.textContent = questions[questionCounter].question;
        correctAnswer = questions[questionCounter].answer;
        ques.append(h2);
        ques.append(ul);
        select = document.querySelectorAll("li.option");
        for (i = 0; i < select.length; i++) {
            select[i].addEventListener("click", selectedOption);
        }
        questionCounter++;
        if (questionCounter > 0)
            timer(20);  // after 1st question, next rest of the questions start from 20 sec.
        else
            timer(19); //first question starts from 19 sec because 20 sec already persist on page
    }

}
/**
 * this function performs to check the time, and user selected the option, generates the result as per selection on screen
 */
function selectedOption(event) {
    clearInterval(timeOfSec);
    var selectedAns = event.target.textContent;
    // if selected option is right then displays the green colour with right check
    if (selectedAns == correctAnswer) {
        for (var i = 0; i < select.length; i++) {
            if (select[i].textContent == correctAnswer) {
                select[i].classList.add("correct");
                iconCorrect.className = "fas fa-check-square"; //right check icon
                select[i].append(iconCorrect);
                gamePoints += 5;
            }
        }
    } else {
        //shows wrong by icon and colour, and displays correct answer also stops the time.
        var wrong = event.target;
        wrong.classList.add("wrong");
        iconWrong.className = "fas fa-times-square"; //wrong check icon
        wrong.append(iconWrong);
        for (var k = 0; k < select.length; k++) {
            if (select[k].textContent == correctAnswer) {
                select[k].classList.add("correct");
                iconCorrect.className = "fas fa-check-square"; //right check icon
                select[k].append(iconCorrect);
            }
        }
    }
    //disabled selection of options when time off
    for (var j = 0; j < ques.childNodes[1].children.length; j++) {
        ques.childNodes[1].children[j].classList.add("disabled");
    }
}


/**
 * 
 * gets the total each question time in second as argument, invokes the timer function   
 */
function timer(time) {
    seconds = time;
    timeOfSec = setInterval(secondTime, 1000);
}

/**
 * activates the timer for each queston during challenge
 */
function secondTime() {
    timerSecond.textContent = seconds;
    seconds--;
    if (seconds < 0) {
        clearInterval(timeOfSec);
        //displays the correct answer when after time off
        for (var i = 0; i < select.length; i++) {
            if (select[i].textContent == correctAnswer) {
                select[i].classList.add("correct");
                iconCorrect.className = "fas fa-check-square"; //right check icon
                select[i].append(iconCorrect);
            }
        }
        //disabled selection of options when time off
        for (var j = 0; j < ques.childNodes[1].children.length; j++) {
            ques.childNodes[1].children[j].classList.add("disabled");
        }
    }
}

/**
 * prepares the curent challenge result
 */
function result() {
    nextQuestion.style.visibility = "hidden";
    var quizTimer = document.querySelector(".quiz-time");
    quizTimer.style.visibility = "hidden";
    prepareDisplay();
    submitResult();
}
