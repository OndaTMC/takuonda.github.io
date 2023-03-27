let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]; //各時間の変数を宣言
let [overtimeMilliseconds, overtimeSeconds, overtimeMinutes, overtimeHours] = [0, 0, 0, 0];//各残業時間の変数を宣言
let timerRef = document.querySelector('.timerDisplay');//変数に経過時間の表示場所を格納
let overTimeRef = document.querySelector(`.overTimeDisplay`);//変数に残業の経過時間の表示場所を格納
let int = null;//変数を初期化

document.getElementById('startTimer').addEventListener('click', () => { //startボタンがクリックされたとき
    if (int !== null) { //intが初期状態でなければ、インターバルをクリア
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10); //関数displayTimerをparameter 10でインターバルを実行
    saveTime(); //localStorageに保存するために関数saveTimeを実行
});

document.getElementById('pauseTimer').addEventListener('click', () => { //pauseボタンがクリックされたとき
    clearInterval(int); //インターバルをクリア
    saveTime();
});

document.getElementById('resetTimer').addEventListener('click', () => { //resetボタンがクリックされたとき
    clearInterval(int); //インターバルをクリア
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]; //各時間の変数を0に設定
    timerRef.innerHTML = '00 : 00 : 00'; //メインのディスプレイに0を表示
    saveTime();
});

document.getElementById('overtimeReset').addEventListener('click', () => { //overtimeresetボタンがクリックされたとき
    clearInterval(int); //インターバルをクリア
    [overtimeMilliseconds, overtimeSeconds, overtimeMinutes, overtimeHours] = [0, 0, 0, 0]; //残業の各時間の変数を0に設定
    overTimeRef.innerHTML = '00 : 00 : 00'; //overtimeのディスプレイに0を表示
    saveTime();
});

function displayTimer() { //タイマーの関数を宣言
    milliseconds += 10; //msを10ごとにインクリメント

    if (milliseconds == 1000) { //1000msで1s
        milliseconds = 0;
        seconds++;

        if (seconds == 60) { //60sで1min
            seconds = 0;
            minutes++;

            if (minutes == 60) { //60minで1h
                minutes = 0;
                hours++;
            }
        }
    }

    //表示用に新たに変数を宣言
    let h = hours < 10 ? "0" + hours : hours; //hoursが10以下の場合は、表に2桁目に0を表示
    let m = minutes < 10 ? "0" + minutes : minutes; //minutesが10以下の場合は、表に2桁目に0を表示
    let s = seconds < 10 ? "0" + seconds : seconds; //secondsが10以下の場合は、表に2桁目に0を表示


    timerRef.innerHTML = ` ${h} : ${m} : ${s}`; //  ディスプレイに経過時間を表示

    if (s >= 8) { //8時間以上経過した場合はovertimeDisplayTimer関数を実行
        overtimeDisplayTimer();
    }
    saveTime();
}

function overtimeDisplayTimer() { //overtimeを計測する関数を宣言
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
    saveTime();
}


function saveTime() { //valueをlocalStorageに保存する関数を宣言
    //各関数のvalueを""内のkeyとセットで格納
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

function showTime() { //valueを指定したkeyによって呼び出す関数を宣言
    //呼び出したvalueを変数に格納
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

    //各変数が初期値でなければ各ディスプレイに表示
    if (savedTime !== null) {
        timerRef.innerHTML = savedTime;
    }
    if (savedOvertime !== null) {
        overTimeRef.innerHTML = savedOvertime;
    }
    //savedの変数が初期値でなければ各変数にparseIntで数値型に変換して格納
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
    //overtimeに関する変数に関しても同様のことを実行
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
