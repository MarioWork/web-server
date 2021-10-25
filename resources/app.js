//****************Selectors*************************//
const stopwatchContainer = document.getElementById("stopwatchContainer");
const timerContainer = document.getElementById("timerContainer");
const clockContainer = document.getElementById("clockContainer");

const stopwatchAction = document.getElementById("stopwatch");
const timerAction = document.getElementById("timer");
const clockAction = document.getElementById("clock");


//****************Event Listeners*************************//
stopwatchAction.addEventListener("click", showStopwatchContainer);
timerAction.addEventListener("click", showTimerContainer);
clockAction.addEventListener("click", showClockContainer);

//TODO
clockAction.click();

//****************Functions*************************//
function showStopwatchContainer() {

    //Toggle between the nav actions
    stopwatchAction.classList.add("textDecor");
    timerAction.classList.remove("textDecor");
    clockAction.classList.remove("textDecor");

    //Toggle between the containers
    stopwatchContainer.style.display = "block";
    timerContainer.style.display = "none";
    clockContainer.style.display = "none";
}

function showTimerContainer() {

    //Toggle between the nav actions
    stopwatchAction.classList.remove("textDecor");
    timerAction.classList.add("textDecor");
    clockAction.classList.remove("textDecor");

    //Toggle between the containers
    stopwatchContainer.style.display = "none";
    timerContainer.style.display = "block";
    clockContainer.style.display = "none";
}

function showClockContainer() {
    setClock();
    setInterval(setClock, 1000);

    //Toggle between the nav actions
    stopwatchAction.classList.remove("textDecor");
    timerAction.classList.remove("textDecor");
    clockAction.classList.add("textDecor");

    //Toggle between the containers
    stopwatchContainer.style.display = "none";
    timerContainer.style.display = "none";
    clockContainer.style.display = "block";
}


