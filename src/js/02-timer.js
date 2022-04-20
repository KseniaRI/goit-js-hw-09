import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

startButton.disabled = true;
let deadline = null;
let timerIsStarted = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      deadline = selectedDates[0];
    }
  },
}

flatpickr("#datetime-picker", options);

startButton.addEventListener("click", countdown);

function countdown() {
  if (timerIsStarted === true) {
    return;
  }
    timerIsStarted = true;
    const intervalId = setInterval(() => {
      const remainingTime = deadline.getTime() - Date.now();
    
      if (remainingTime <= 0) {
      clearInterval(intervalId);
      return;
    }
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      
      timerRefs.days.textContent = `${days}`;
      timerRefs.hours.textContent = `${hours}`;
      timerRefs.minutes.textContent = `${minutes}`;
      timerRefs.seconds.textContent = `${seconds}`;
      
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);
  }, 1000);
}

function addLeadingZero(number) {
    return String(number).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}









