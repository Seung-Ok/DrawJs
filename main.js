'use strict';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2;
let painting = false;

canvas && canvas.addEventListener('mousemove', onMouseMove);
canvas && canvas.addEventListener('mousedown', startPainting);
canvas && canvas.addEventListener('mouseup', stopPainting);
canvas && canvas.addEventListener('mouseleave', stopPainting);

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
