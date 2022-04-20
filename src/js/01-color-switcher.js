const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
    bodyEl: document.body,
}

refs.stopButton.addEventListener("click", onStop);
refs.startButton.addEventListener("click", onStart);

let timerId = null;
let startButtonIsDisable = false;

function onStart() {
    if (startButtonIsDisable === false) {
        timerId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
        startButtonIsDisable = true;
        }, 1000);   
    }
}

function onStop() {
    clearInterval(timerId); 
    startButtonIsDisable = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}