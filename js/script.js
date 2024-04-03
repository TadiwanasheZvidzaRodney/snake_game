const playBoard = document.querySelector(".play-board")

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10; // it's fixed (snake-head)
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;

const changeFoodPosition = () => {
    // passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over Bro! Press OK to replay...");
    location.reload();
}

const changeDirection = (e) => {
    // changing velocity value based on key pressed
    if (e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"></div>`;

    // checking if the snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); //pushing food position to snakeBody array
        console.log(snakeBody);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // setting first element of snake body to current snake position

    // updating the snake-head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // checking if the snake head is out of wall, if so setring gameOver to true
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // adding a div for each part of the snake's head
        htmlMarkup += `<div class = "snake-head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }

    playBoard.innerHTML = htmlMarkup;
    // so here i inserted a div inside our main .html doc (DOM munipulation) reasons i don't 
    // know yet. why not just create a the same div in the main doc???😮‍💨
}

changeFoodPosition();

setIntervalId = setInterval(initGame, 125); //now the head will move after every 125ms. 125 is the speed of the snake

document.addEventListener("keydown", changeDirection);