'use strict';

const canvas = document.querySelector('.canvas');
const colors = document.querySelectorAll('.color');
const range = document.querySelector('.input__range');
const mode = document.querySelector('.mode');
const modeFill = document.querySelector('.mode__fill');

const CANVAS_SIZE = 550;

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

function startPainting() {
  painting = true;
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
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } else {
    return;
  }
}
