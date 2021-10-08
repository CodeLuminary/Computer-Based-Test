//This is an example of a json data
var exam = {
    "duration": 61,
    "instruction": "Please answer all questions and do not waste time with any question because some are harder than the others",
    "questions":[
        {
            "question": "Who is the current president of the United states",
            "options": ["Muhammedu Buhari","Vlamir Putin", "Joe Biden"],
            "answerPosition": 3
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
var examLength = exam.duration; //Exam length in minutes
var sec = 0;
var timerObject;
function showCbt(){
    document.getElementById("link-modal").style.display = "none";
    timerObject = setInterval(runTimer,999);
}
function runTimer(){  
    if(sec == 0){
        if(examLength > 0){
            examLength--;
            sec = 59;
        }
        else{
            clearInterval(timerObject);
        }
    }
    else{
        sec--;
    }
    var hour = Math.floor(examLength / 60);
    var min = examLength % 60;
    document.getElementById("timerSpan").innerHTML = hour.toString() + " : " + min.toString() + " : " + sec.toString();
}