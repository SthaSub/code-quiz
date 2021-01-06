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
        question: "Q2. What is fullform of CSS, and JS?",
        answer: "Cascading Style Sheet, and Javascript",
        options: ["None of these", "Code Style Sheet, and Joinscript", "Cascade Short Sheet, and Javascript ", "Cascading Style Sheet, and Javascript"]

    },
    {
        key: 3,
        question: "Q3. In javascript object consists of ?",
        answer: "key/value or key/property",
        options: ["None of these", "key/value or key/property", "value", "primitive datatype"]

    },
    {
        key: 4,
        question: "Q4. Control flow statement are ",
        answer: "while, for, and do-while",
        options: ["while, for, and do-while", "if-else, and if-elseif-else", "switch-case", "None of these"]
    },
    {
        key: 5,
        question: "Q5. Which datatypes allows only one of two possible values?",
        answer: "boolean",
        options: ["boolean", "None of these", "int", "char"]
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
/**
 * prepares the total score page and input text
 */
function prepareDisplay() {
    ques.innerHTML = ""; // clears the page for next question to be displayed
    resultForm = document.createElement("form");
    inputText = document.createElement("input");
    displayResult = document.createElement("div");
    submitButton = document.createElement("button");
    displayResult.textContent = "Your final score: " + gamePoints + " - "; //prepares the final score of player
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "playerName");
    inputText.setAttribute("placeholder", "write your name here.");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("id", "result");
    submitButton.className = "btn btn-primary";
    submitButton.textContent = "submit";
    resultForm.appendChild(displayResult);
    resultForm.appendChild(inputText);
    resultForm.appendChild(submitButton);
    ques.append(resultForm);
}

//get the total keys length form local storage.
var keyCounter = Object.keys(localStorage).length;

//final submit score on local storage
function submitResult() {
    submitButton.addEventListener("click", function () {
        var input = document.querySelector("input");
        if (input.value === "") {//displays alert if nothing entered on player name text field
            alert("Enter your name please!");
            return false;
        } else {
            localStorage.setItem(keyCounter++, JSON.stringify({ name: inputText.value, value: gamePoints })); //insert the current score with player set name
            location.href = "./result.html";
        }
    });
}

//result page class selector
var resultPage = document.querySelector(".result");

//prepare to display final score with name, and takes the action back or clear as per user will
function highScore() {
    var back = document.createElement("button");
    var resultBtnGrp = document.querySelector(".result-btn-grp");
    back.className = "btn btn-primary";
    back.setAttribute("id", "next-question");
    back.textContent = "BACK";
    var clearHighScore = document.createElement("button");
    clearHighScore.className = "btn btn-outline-primary";
    clearHighScore.setAttribute("id", "start");
    clearHighScore.textContent = "CLEAR HIGHSCORE";
    resultPage.innerHTML = ""; //clearing any default elements which can be persist during highscore presentation.
    var highscore = document.createElement("table");
    highscore.className = "table table-striped";
    highscore.innerHTML = "<tr>" + "<th scope=\"col\" >" + "#" + "</th>" + "<th scope=\"col\">" + "Highscore" + "</th>"+
        "<th scope=\"col\">" + "Player Name" + "</th>" + "</tr>" + viewScore("finalHighscore");
    resultPage.append(highscore);
    resultBtnGrp.append(back);
    resultBtnGrp.append(clearHighScore);
    back.addEventListener("click", function () {
        location.href = "./index.html"; //redirect to index page
    });
    clearHighScore.addEventListener("click", function () {
        localStorage.clear(); //clears the localstorage data
        location.reload(); //refresh the current after event executes
    });
}

/**
 * this function prompts the high score with player name 
 */
function viewScore(args) {
    var length = localStorage.length;
    var store = [];
    var valueObj = {};
    //storing json oject into valueObj object
    for (var i = 0; i < length; i++) {
        valueObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        store[i] = {
            name: valueObj.name,
            score: valueObj.value
        };
    }
    //return high value first by comparesion
    var result = store.sort(function (a, b) {
        return b.score - a.score;
    });
    var finalDisplay = "";
    //final display on alert
    for (var j = 0; j < result.length; j++) {
        if (j < 5) // limiting score and playername display upto 5 
        {
            if (args == "finalHighscore")
                finalDisplay = finalDisplay + " <tr> " +
                    "<td>" + (j + 1) + ". " + "</td>" +
                    "<td>" + result[j].score + "</td>" +
                    "<td>" + result[j].name + "</td>" +
                    "</tr>";
            else finalDisplay = finalDisplay + (j + 1) + ". " + result[j].score + " ( " + result[j].name + " )" + "\n";
        }
    }
    //prevents executing alert automatically during final result page
    if (args != "finalHighscore")
        alert("TOP  FIVE  HIGH   SCORE \n**************************\n" + finalDisplay);

    return finalDisplay;
}

//checks whether quiz html is active or not, if not then shows the index html or prepare to show the result page
if (startQuiz !== null)
    startQuiz.addEventListener("click", start);
else if (ques !== null)
    show();
else
    highScore();

//prevents the invokes of nextquestion during the start of game    
if (nextQuestion !== null)
    nextQuestion.addEventListener("click", show);

//allows to active after starting game
if (viewHighScore !== null)
    viewHighScore.addEventListener("click", viewScore);