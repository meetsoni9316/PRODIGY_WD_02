let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    display.textContent = `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
}

function format(number) {
    return number < 10 ? '0' + number : number;
}

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        isRunning = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    lapTimes = [];
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = Date.now() - startTime + elapsedTime;
        lapTimes.push(lapTime);
        const li = document.createElement('li');
        li.textContent = display.textContent;
        lapsList.appendChild(li);
    }
});

