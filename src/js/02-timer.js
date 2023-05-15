import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataInputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let countDownInterval = null;
let userSelectedDate = 0;
let dateUpdate = {};

startBtn.disabled = true;

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    ms = userSelectedDate - Date.now();
    if (selectedDates[0].getTime() < Date.now())
      return alert('Please choose a date in the future');
    startBtn.disabled = false;
  },
};

flatpickr(dataInputEl, options);

const addLeadingZero = e => e.toString().padStart(2, '0');

const timeUpdate = () => {
  dateUpdate = convertMs(ms);
  days.textContent = addLeadingZero(dateUpdate.days);
  hours.textContent = addLeadingZero(dateUpdate.hours);
  minutes.textContent = addLeadingZero(dateUpdate.minutes);
  seconds.textContent = addLeadingZero(dateUpdate.seconds);
  ms -= 1000;

  if (ms < 0) {
    clearInterval(countDownInterval);
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
  }
};

startBtn.addEventListener('click', () => {
  ms = userSelectedDate - Date.now();
  clearInterval(countDownInterval);
  countDownInterval = setInterval(() => timeUpdate(), 1000);
  startBtn.disabled = false;
});
