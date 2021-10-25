//****************Selectors*************************//
const hoursInputTimer = document.getElementById("hours-timer");
const minutesInputTimer = document.getElementById("minutes-timer");
const secondsInputTimer = document.getElementById("seconds-timer");

const ToggleTimerBtn = document.getElementById("startBtn-timer");
const resetTimerBtn = document.getElementById("resetBtn-timer");

//****************Events Listeners*************************//
ToggleTimerBtn.addEventListener("click", toggleTimer);
resetTimerBtn.addEventListener("click", resetTimer);


//****************functions*************************//
var hourTimer = 0;
var minTimer = 0;
var secTimer = 0;
var totalSeconds = 0;
var stopTimer = true;
var timerInterval;

function toggleTimer() {
    //Verify if the input is empty or not and place the right value in the variable
    hourTimer = hoursInputTimer.value === '' ? 0 : parseInt(hoursInputTimer.value);
    minTimer = minutesInputTimer.value === '' ? 0 : parseInt(minutesInputTimer.value);
    secTimer = secondsInputTimer.value === '' ? 0 : parseInt(secondsInputTimer.value);

    //Get the total seconds from the timer
    totalSeconds = secTimer + (minTimer * 60) + (hourTimer * (3600));

    if (stopTimer == true && totalSeconds != 0) {


        //Start timer
        timerInterval = setInterval(startTimerCycle, 1000);

        stopTimer = false;
        ToggleTimerBtn.innerText = "Stop";
    } else {

        //Reset the total count of seconds
        totalSeconds = 0;
        stopTimer = true;
        ToggleTimerBtn.innerText = "Start";

        //Stop the counting
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    stopTimer = true;

    //Stop the counting
    clearInterval(timerInterval);

    //Reset all local variables
    hourTimer = 0;
    minTimer = 0;
    secTimer = 0;
    totalSeconds = 0;

    //Reset the input values
    hoursInputTimer.value = '';
    minutesInputTimer.value = '';
    secondsInputTimer.value = '';

    ToggleTimerBtn.innerText = "Start";
}

function startTimerCycle() {

    //Decrement the amount of total seconds
    totalSeconds--;


    console.log(totalSeconds);


    if (totalSeconds === 0) {
        resetTimer();
    }


    hourTimer = Math.floor(totalSeconds / 3600); //Total seconds by the seconds in an hour rounded down
    minTimer = Math.floor((totalSeconds - (hourTimer * 3600)) / 60); //Total seconds minus total hours in seconds rounded down
    secTimer = Math.floor(totalSeconds - (hourTimer * 3600) - (minTimer * 60)); //total seconds left (total seconds minus hours, minutes in seconds)

    hoursInputTimer.value = checkSingleCharacter(hourTimer.toString());
    minutesInputTimer.value = checkSingleCharacter(minTimer.toString());
    secondsInputTimer.value = checkSingleCharacter(secTimer.toString());
}



var checkSingleCharacter = function (str) {
    if (str.length == 1) {
        return '0' + str;
    } else {
        return str;
    }
}