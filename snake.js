"use strict";
const board = document.querySelector(".board");
const scoreDisplay = document.querySelector('.score')
let blockSize = 30;
let rows = 25;
let column = 25;
let context = board.getContext("2d");
let snakeX = blockSize * 12;
let snakeY = blockSize * 12;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let score=0, foodCoordX, foodCoordY;
let gameOver = false;

function init(){
  blockSize = 30;
  rows = 25;
  column = 25;
  snakeX = blockSize * 12;
  snakeY = blockSize * 12;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  gameOver = false;
  score = 0
  scoreDisplay.textContent = 0
}

window.onload = function () {
  board.height = rows * blockSize;
  board.width = column * blockSize;
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 5);
};

function update() {
  if (gameOver) {
    init()
  } 
    //Context
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    //Food
    context.fillStyle = "red";
    context.fillRect(foodCoordX, foodCoordY, blockSize, blockSize);

    if (snakeX == foodCoordX && snakeY == foodCoordY) {
      snakeBody.push([foodCoordX, foodCoordY]);
      placeFood();
      score += 10;
      scoreDisplay.innerText = `${score}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
      snakeBody[0] = [snakeX, snakeY];
    }
    //Snake
    context.fillStyle = "teal";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (
      snakeX < 0 ||
      snakeX > column * blockSize ||
      snakeY < 0 ||
      snakeY > rows * blockSize
    ) {
      gameOver = true;
      alert(`GAME OVER!!! YOUR SCORE: ${score}`);
    }
    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        alert(`GAME OVER!!! YOUR SCORE: ${score}`);
      }
    }

  }


function changeDirection(e) {
  if (e.code == "ArrowUp" || (e.code == "Numpad8" && velocityY != 1)) {
    velocityX = 0;
    velocityY = -1;
  } else if (
    e.code == "ArrowDown" ||
    (e.code == "Numpad2" && velocityY != -1)
  ) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" || (e.code == "Numpad4" && velocityX != 1)) {
    velocityX = -1;
    velocityY = 0;
  } else if (
    e.code == "ArrowRight" ||
    (e.code == "Numpad6" && velocityX != -1)
  ) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodCoordX = Math.floor(Math.random() * column) * blockSize;
  foodCoordY = Math.floor(Math.random() * column) * blockSize;
}
