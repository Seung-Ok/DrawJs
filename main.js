'use strict';

const canvasContainer = document.querySelector('.canvas__container');
const canvas = document.querySelector('.canvas');
const colors = document.querySelectorAll('.color');
const range = document.querySelector('.input__range');
const modeFill = document.querySelector('.mode__fill');
const modeSave = document.querySelector('.mode__save');
const modeReset = document.querySelector('.mode__reset');
const clock = document.querySelector('.clock');
const dayOrNight = document.querySelector('.header__toggle');
const body = document.querySelector('body');

const CANVAS_WIDTH = 760;
const CANVAS_HEIGHT = 470;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 5;
let painting = false;
let filling = false;

canvas && canvas.addEventListener('mousemove', onMouseMove);
canvas && canvas.addEventListener('mousedown', startPainting);
canvas && canvas.addEventListener('mouseup', stopPainting);
canvas && canvas.addEventListener('mouseleave', stopPainting);
canvas && canvas.addEventListener('mousedown', handleCanvas);
range && range.addEventListener('input', handleRange);
modeFill && modeFill.addEventListener('click', handleMode);
modeSave && modeSave.addEventListener('click', handleSave);
modeReset && modeReset.addEventListener('click', handleReset);
clock && clock.addEventListener('load', realTimeClock());
dayOrNight && dayOrNight.addEventListener('click', handleDayNight);

function startPainting(event) {
  if (event.which != 1) {
    return;
  } else {
    painting = true;
  }
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;
  if (!painting) {
    ctx.beginPath();
  } else {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
}

colors.forEach((color) => {
  color.addEventListener('click', () => {
    handleColor(color);
  });
});

function handleColor(event) {
  const color = event.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRange(event) {
  ctx.lineWidth = event.target.value;
}

function handleMode() {
  if (filling) {
    filling = false;
    modeFill.textContent = 'Fill';
  } else {
    filling = true;
    modeFill.textContent = 'Paint';
  }
}

function handleCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    return;
  }
}

function handleSave() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = '🎨image🎨';
  link.click();
}

function handleReset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clockTo() {
  const newClock = new Date();
  const year = newClock.getFullYear();
  const month = newClock.getMonth() + 1;
  const date = newClock.getDate();
  const day = newClock.getDay();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const hour = String(newClock.getHours()).padStart(2, '0');
  const minute = String(newClock.getMinutes()).padStart(2, '0');
  const second = String(newClock.getSeconds()).padStart(2, '0');

  clock.textContent = `${year}년 ${month}월 ${date}일 ${week[day]}요일 ${hour} : ${minute} : ${second}`;
}

function realTimeClock() {
  clockTo();
  setInterval(clockTo, 1000);
}

function handleDayNight(event) {
  const target = event.target;

  if (event.target.classList.contains('header__toggle')) {
    return;
  }

  body.classList.toggle('visible');
  const onVisible = body.classList.contains('visible');

  if (onVisible) {
    target.classList.remove('fa-toggle-off');
    target.classList.add('fa-toggle-on');
    dayOrNight.style.color = 'black';
  } else {
    target.classList.remove('fa-toggle-on');
    target.classList.add('fa-toggle-off');
    dayOrNight.style.color = 'white';
  }
}
