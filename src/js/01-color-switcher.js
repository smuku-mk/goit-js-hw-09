const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop');
let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', e => {
  e.currentTarget.disabled = true;
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', e => {
  btnStart.disabled = false;
  clearInterval(timer);
});
