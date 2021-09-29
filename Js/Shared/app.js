var examLength = 61; //Exam length in minutes
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