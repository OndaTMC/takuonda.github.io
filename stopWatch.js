let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [overtimeMilliseconds, overtimeSeconds, overtimeMinutes, overtimeHours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let overTimeRef = document.querySelector(`.overTimeDisplay`);
let int = null;

document.getElementById('startTimer').addEventListener('click', () => {
    if (int !== null) {
        clearInterval(int);
    }
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
    [overtimeMilliseconds, overtimeSeconds, overtimeMinutes, overtimeHours] = [0, 0, 0, 0];
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

    if (s >= 5) {
        overtimeDisplayTimer();
    }
    saveData();
}

function overtimeDisplayTimer() {
    overtimeMilliseconds += 10;

    if (overtimeMilliseconds == 1000) {
        overtimeMilliseconds = 0;
        overtimeSeconds++;

        if (overtimeSeconds == 60) {
            overtimeSeconds = 0;
            overtimeMinutes++;

            if (overtimeMinutes == 60) {
                overtimeMinutes = 0;
                overtimeHours++;
            }
        }
    }


    let h = overtimeHours < 10 ? "0" + overtimeHours : overtimeHours;
    let m = overtimeMinutes < 10 ? "0" + overtimeMinutes : overtimeMinutes;
    let s = overtimeSeconds < 10 ? "0" + overtimeSeconds : overtimeSeconds;


    overTimeRef.innerHTML = ` ${h} : ${m} : ${s}`;
    saveData();
}


function saveData() {
    localStorage.setItem("time", timerRef.innerHTML);
    localStorage.setItem("overtime", overTimeRef.innerHTML);
    localStorage.setItem("milliseconds", milliseconds);
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("hours", hours);
    localStorage.setItem("overtimeMilliseconds", overtimeMilliseconds);
    localStorage.setItem("overtimeSeconds", overtimeSeconds);
    localStorage.setItem("overtimeMinutes", overtimeMinutes);
    localStorage.setItem("overtimeHours", overtimeHours);
}

function showTime() {
    const savedTime = localStorage.getItem("time");
    const savedOvertime = localStorage.getItem("overtime");
    const savedMilliseconds = localStorage.getItem("milliseconds");
    const savedSeconds = localStorage.getItem("seconds");
    const savedMinutes = localStorage.getItem("minutes");
    const savedHours = localStorage.getItem("hours");
    const savedOverTimeMilliseconds = localStorage.getItem("overtimeMilliseconds");
    const savedOverTimeSeconds = localStorage.getItem("overtimeSeconds");
    const savedOverTimeMinutes = localStorage.getItem("overtimeMinutes");
    const savedOverTimeHours = localStorage.getItem("overtimeHours");

    if (savedTime !== null) {
        timerRef.innerHTML = savedTime;
    }
    if (savedOvertime !== null) {
        overTimeRef.innerHTML = savedOvertime;
    }
    if (savedMilliseconds !== null) {
        milliseconds = parseInt(savedMilliseconds);
    }
    if (savedSeconds !== null) {
        seconds = parseInt(savedSeconds);
    }
    if (savedMinutes !== null) {
        minutes = parseInt(savedMinutes);
    }
    if (savedHours !== null) {
        hours = parseInt(savedHours);
    }
    if (savedOverTimeMilliseconds !== null) {
        overtimeMilliseconds = parseInt(savedOverTimeMilliseconds);
      }
      if (savedOverTimeSeconds !== null) {
        overtimeSeconds = parseInt(savedOverTimeSeconds);
      }
      if (savedOverTimeMinutes !== null) {
        overtimeMinutes = parseInt(savedOverTimeMinutes);
      }
      if (savedOverTimeHours !== null) {
        overtimeHours = parseInt(savedOverTimeHours);
      }
}

showTime();
