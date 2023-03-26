let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [OvertimeMilliseconds, OvertimeSeconds, OvertimeMinutes, OvertimeHours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let overTimeRef = document.querySelector(`.overTimeDisplay`);
let int = null;

document.getElementById('startTimer').addEventListener('click', () => {
    // if (int !== null) {
    //     clearInterval(int);
    // }
    int = setInterval(displayTimer, 10);
    saveData();
    showTime();
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    clearInterval(int);
    saveData();
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00';
    saveData();
});

document.getElementById('overtimeReset').addEventListener('click', () => {
    clearInterval(int);
    [OvertimeMilliseconds, OvertimeSeconds, OvertimeMinutes, OvertimeHours] = [0, 0, 0, 0];
    overTimeRef.innerHTML = '00 : 00 : 00';
    saveData();
});

function displayTimer() {
    milliseconds += 10;

    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;

            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }


    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;


    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;

    if (s >= 8) {
        overtimeDisplayTimer();
    }
saveData();
}

function overtimeDisplayTimer() {
    OvertimeMilliseconds += 10;

    if (OvertimeMilliseconds == 1000) {
        OvertimeMilliseconds = 0;
        OvertimeSeconds++;

        if (OvertimeSeconds == 60) {
            OvertimeSeconds = 0;
            OvertimeMinutes++;

            if (OvertimeMinutes == 60) {
                OvertimeMinutes = 0;
                OvertimeHours++;
            }
        }
    }


    let h = OvertimeHours < 10 ? "0" + OvertimeHours : OvertimeHours;
    let m = OvertimeMinutes < 10 ? "0" + OvertimeMinutes : OvertimeMinutes;
    let s = OvertimeSeconds < 10 ? "0" + OvertimeSeconds : OvertimeSeconds;


    overTimeRef.innerHTML = ` ${h} : ${m} : ${s}`;
    saveData();
}


function saveData() {
    localStorage.setItem("time", timerRef.innerHTML);
    localStorage.setItem("overtime", overTimeRef.innerHTML);
}

function showTime() {
    const savedTime = localStorage.getItem("time");
    const savedOvertime = localStorage.getItem("overtime");
    if (savedTime !== null) {
        timerRef.innerHTML = savedTime;
    }
    if (savedOvertime !== null) {
        overTimeRef.innerHTML = savedOvertime;
    }
}

showTime();
