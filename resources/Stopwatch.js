//****************Selectors*************************//
const hoursOutputStopwatch = document.getElementById("hours-stopwatch");
const minutesOutputStopwatch = document.getElementById("minutes-stopwatch");
const secondsOutputStopwatch = document.getElementById("seconds-stopwatch");

const startStopwatchBtn = document.getElementById("startBtn-stopwatch");
const resetStopwatchBtn = document.getElementById("resetBtn-stopwatch");

//****************Events Listeners*************************//
startStopwatchBtn.addEventListener("click", toggleStopwatch);
resetStopwatchBtn.addEventListener("click", resetStopwatch);


//****************functions*************************//
var hour = 0;
var min = 0;
var sec = 0;
var stop = true;
var stopwatchInterval;

function toggleStopwatch() {
    if (stop == true) {
        stopwatchInterval = setInterval(startStopwatchCycle, 1000);
        stop = false;
        startStopwatchBtn.innerText = "Stop";
        
    } else {
        stop = true;
        startStopwatchBtn.innerText = "Start";
        clearInterval(stopwatchInterval);
    }
}


function resetStopwatch() {
    stop = true;

    clearInterval(stopwatchInterval);

    hour = 0;
    min = 0;
    sec = 0;

    hoursOutputStopwatch.innerText = checkSingleCharacter(hour.toString())
    minutesOutputStopwatch.innerText = checkSingleCharacter(min.toString())
    secondsOutputStopwatch.innerText = checkSingleCharacter(sec.toString())

    startStopwatchBtn.innerText = "Start";
}

function startStopwatchCycle() {

    sec++;

    hoursOutputStopwatch.innerText = checkSingleCharacter(hour.toString());
    minutesOutputStopwatch.innerText = checkSingleCharacter(min.toString());
    secondsOutputStopwatch.innerText = checkSingleCharacter(sec.toString());



    if (sec == 60) {
        min++;
        sec = 0;
    }

    if (min == 60) {
        hour++;
        min = 0;
        sec = 0;
    }


}

var checkSingleCharacter = function (str) {
    if (str.length == 1) {
        return '0' + str;
    } else {
        return str;
    }
}

