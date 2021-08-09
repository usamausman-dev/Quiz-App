function RunApp() {
    getData();
    var fiveMinutes = 60 * 0.1,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
}


var questionsArray = [];

function getData() {
    const data = new URLSearchParams(window.location.search).get('data');
    console.log(data);

    var question = JSON.parse(localStorage.getItem(data));
    var obj = Object.keys(question);
    console.log(obj.length);


    for (var i = 0; i < obj.length; i++) {
        var objInd = obj[i];
        questionsArray.push(question[objInd]);
    }
    console.log(questionsArray);


    // Display Total Count of Questions
    var qCount = document.getElementById('questionCount');
    qCount.innerHTML = questionsArray.length;

}

setTimeout(function () {
    console.log(questionsArray);
    showQuestion(0);
}, 500);


function showQuestion(e) {
    // Show Current Question No
    var cCount = document.getElementById('currentCount');
    var questionCount = questionsArray.indexOf(questionsArray[e])
    cCount.innerHTML = questionCount + 1;

    // Show Questions
    var questionElement = document.getElementById('questionElement');
    questionElement.innerHTML = questionsArray[e].question;

    // ShowOptions
    var optionsElement = document.getElementsByClassName("options");
    for (var i = 0; i < optionsElement.length; i++) {

        var optkey = Object.keys(questionsArray[e].options);
        optionsElement[i].innerHTML = questionsArray[e].options[optkey[i]]
    }
}

var qCount = 0;
function nextQuestion() {
    check(qCount);
    qCount++;

    if (qCount <= questionsArray.length - 1) {
        showQuestion(qCount);
    }
    deactivate();
    setResult();
}


function activate(e) {
    deactivate();
    e.classList.add("active");
}

function deactivate(e) {
    var active = document.getElementsByClassName("active");
    for (var i = 0; i < active.length; i++) {
        active[i].classList.remove("active");
    }
}

var score = 0;
function check(e) {
    var active = document.getElementsByClassName("active");
    if (active[0].innerHTML == questionsArray[e].correct) {
        score += 10;
    }
}


function setResult() {
    if (qCount == questionsArray.length) {
        var percentage = (score / (10 * questionsArray.length)) * 100
        alert(`Total Question = ${questionsArray.length} , and you scored : ${percentage}% marks`);
        window.location.href = "index.html";
    }
}


// Code For Timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            var percentage = (score / (10 * questionsArray.length)) * 100
            alert(`Total Question = ${questionsArray.length} , and you scored : ${percentage}% marks`);
            window.location.href = "index.html";
            timer = duration;
        }

    }, 1000);
}