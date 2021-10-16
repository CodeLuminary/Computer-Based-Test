//This is an example of a json data
//NB: The questions are supposed to be served from an api not added in the javascript
var exam = {
    "duration": 61,
    "instruction": "Please answer all questions and do not waste time with any question because some are harder than the others",
    "questions":[
        {
            "question": "Who is the current president of the United states?",
            "options": ["Muhammedu Buhari","Vlamir Putin", "Joe Biden"],
            "answerPosition": 2
        },
        {
            "question": "How many countries are in the world?",
            "options":[249,195,300],
            "answerPosition": 1
        },
        {
            "question": "How many continents are in the world?",
            "options": [7, 5, 10, 8, 15],
            "answerPosition": 0
        },
        {
            "question": "How many countries are in the united nations?",
            "options": [120, 190, 193,200],
            "answerPosition": 2
        }
    ]
}

var sec = 0;
var timerObject;

var questionDiv = document.getElementById("questionDiv");
var optionDiv = document.getElementById("optionDiv");
var questionsButton = document.getElementById("questionsButton");

var answers = [];var examLength;

function showCbt(){
    document.getElementById("link-modal").style.display = "none";
    document.querySelector(".navbar").style.backgroundColor="#fff";
    questionsButton.innerHTML = "";examLength = exam.duration; //Exam length in minutes
    for(var i = 0; i < exam.questions.length; i++){
        questionsButton.innerHTML += '<button class="qbtn" onclick="return showQuestion('+i.toString()+')">'+(i + 1).toString()+'</button>';
        answers[i] = -1;
    }
    showQuestion(0);
    timerObject = setInterval(runTimer,999);
}
function runTimer(){  
    if(sec == 0){
        if(examLength > 0){
            examLength--;
            sec = 59;
        }
        else{
            submitExam();
        }
    }
    else{
        sec--;
    }
    var hour = Math.floor(examLength / 60);
    var min = examLength % 60;
    document.getElementById("timerSpan").innerHTML = hour.toString() + " : " + min.toString() + " : " + sec.toString();
}
function showQuestion(questionNumber){
    questionDiv.innerHTML = exam.questions[questionNumber].question;
    optionDiv.innerHTML = "";
    for(var i = 0; i < exam.questions[questionNumber].options.length; i++){
        optionDiv.innerHTML += '<input type="radio" onclick="selectAnswer('+questionNumber+','+ i.toString()+')" name="questionOptions"/>' + exam.questions[questionNumber].options[i].toString() + '<br>';
    }
    const questionButton =   document.querySelectorAll("#questionsButton > button");
    for(let i = 0; i < questionButton.length; i++){
        questionButton[i].classList.remove("currentQuestion");
    }
    questionButton[questionNumber].classList.add("currentQuestion");
}
function selectAnswer(questionNumber,optionNumber){
  answers[questionNumber] = optionNumber;
  document.querySelectorAll("#questionsButton > button")[questionNumber].className += " blueHightlight";
  answer[questionNumber] = optionNumber;
}
var modal = document.querySelector(".modal");
function showInstruction(){
    document.querySelector("#instructions").innerHTML = exam.instruction;
    modal.style.display = "block";
}
function closeModal(){
    modal.style.display = "none";
}
function callApi(){
    ajaxApi(document.getElementById("cbtLink").value);
}
function ajaxApi(url){
    document.getElementById("link-modal").style.display = "none";
    modal.style.display = "block";
    document.querySelector(".modal-content").style.display = "none";
    document.querySelector(".loader2").style.display = "block";

    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            modal.style.display = "none";
            document.querySelector(".modal-content").style.display = "block";
            document.querySelector(".loader2").style.display = "none";

            alert(xhhtp.responseText);
            exam = JSON.Parse(xhhtp.responseText);
        }
    }
    xhhtp.open("GET", url, true);
    xhhtp.send();
}
function promptUser(){
    var instructionPar = document.querySelector("#instructions");
    instructionPar.innerHTML = "<p>Are you sure you want to end this exam?</p>";
    instructionPar.innerHTML += "<p class='par-btn'><button onclick='submitExam()'>Yes</button><button onclick='closeModal()'>No</button></p>"
    modal.style.display = "block";
}
function submitExam(){
    clearInterval(timerObject);
    modal.style.display = "none";
     var score = 0;
    for(var i = 0; i < exam.questions.length; i++){
        if(answers[i] == exam.questions[i].answerPosition){
            score++;
        }    
    }
    document.querySelector(".content > div:last-child > div").innerHTML = "Your exam have ended";
    document.querySelector(".total").innerHTML = "Total Score: " + score.toString();
}
