//****************Selectors*************************//
const hoursOutput = document.getElementById("hours");
const minutesOutput = document.getElementById("minutes");
const secondsOutput = document.getElementById("seconds");


//****************Event Listeners*************************//



//****************Functions*************************//
var setClock = function () {
    var today = new Date();

    hoursOutput.innerText = checkSingleCharacter(today.getHours().toString());
    minutesOutput.innerText = checkSingleCharacter(today.getMinutes().toString());
    secondsOutput.innerText = checkSingleCharacter(today.getSeconds().toString());
}





var checkSingleCharacter = function (str) {
    if (str.length == 1) {
        return '0' + str;
    } else {
        return str;
    }
}

