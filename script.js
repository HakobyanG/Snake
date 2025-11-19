let cellSize = 24;
let cols = 20;
let rows = 20;
let snake;
let foods = [];
let bads = [];
let score = 0;
let speed = 6;
let level = 1;
let levelUP = 10;

function setup() {
    createCanvas(cols * cellSize, rows * cellSize);
    background("white")

    let but = document.getElementById('restartBtn')
    but.addEventListener('click', restartGame);
    frameRate(speed);
    restartGame();

    document.addEventListener("click", restartGame)
}

function draw() {
    background(245);
    drawGrid();

    snake.move(cols, rows);
    eating();

    for (let f of foods) {
        drawCell(f.x, f.y, color(40, 200, 120));
    }
    for (let b of bads) {
        drawCell(b.x, b.y, color(240, 80, 80))
    }

    drawSnake(snake, this, cellSize)
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('level').innerText = 'Level: ' + level;

    if (snake.alive == false) {
        noLoop();
        showGameOver();
    }

    updateLevel();
}

function updateLevel() {
    let currentLength = snake.body.length;
    let newLevel = Math.floor(currentLength / levelUP) + 1;
    if (newLevel !== level) {
        level = newLevel;
        let newSpeed = speed * 1.5
        frameRate(newSpeed);
    }
}

function drawGrid() {
    stroke(220);
    strokeWeight(1);
    for (let i = 0; i <= cols; i++) {
        line(i * cellSize, 0, i * cellSize, rows * cellSize)
    }
    for (let j = 0; j <= rows; j++) {
        line(0, j * cellSize, cols * cellSize, j * cellSize);
    }
    noStroke();
}

function drawCell(x, y, col) {
    fill(col);
    rect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.newCell(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.newCell(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        snake.newCell(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.newCell(1, 0);
    }
}

function eating() {
    let head = snake.body[0];
    for (let i = foods.length - 1; i >= 0; i--) {
        let food = foods[i];
        if (food.x === head.x && food.y === head.y) {
            foods.splice(i, 1);
            snake.grow(2);
            score += 10;
            newFood(foods, 1);
        }
    }
    for (let i = bads.length - 1; i >= 0; i--) {
        let bad = bads[i];
        if (bad.x === head.x && bad.y === head.y) {
            bads.splice(i, 1);
            snake.shrink(2);
            score = Math.max(0, score - 5);
            newFood(bads, 1, true);
        }
    }
}

function randomGridPosition() {
    return { x: floor(random(cols)), y: floor(random(rows)) };
}

function newFood(array, n) {
    for (let i = 0; i < n; i++) {
        let pos;
        let valid = false;

        while (!valid) {
            pos = randomGridPosition();
            valid = true;

            for (let sn of snake.body) {
                if (sn.x === pos.x && sn.y === pos.y) {
                    valid = false;
                    break;
                }
            }

            for (let food of foods) {
                if (food.x === pos.x && food.y === pos.y) {
                    valid = false;
                    break;
                }
            }
            for (let bad of bads) {
                if (bad.x === pos.x && bad.y === pos.y) {
                    valid = false;
                    break;
                }
            }
        }

        array.push(pos);
    }
}


function restartGame() {
    let newX = floor(random(2, cols - 3));
    let newY = floor(random(2, rows - 3));
    snake = new Snake(newX, newY, 0);
    snake.grow(2);
    foods = [];
    bads = [];
    score = 0;
    level = 1;
    frameRate(speed);
    newFood(foods, 3);
    newFood(bads, 2, true);
    loop();
}

function showGameOver() {
    push();
    fill(0, 150);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255);
    text('Game Over', width / 2, height / 2 - 14);
    textSize(16);
    text('Press to play again', width / 2, height / 2 + 18);
    pop();
}

function drawSnake(snake, blok, cellSize) {
    blok.noStroke();
    for (let i = 0; i < snake.body.length; i++) {
        let s = snake.body[i];
        if (i === 0) {
            blok.fill(20, 110, 50)
            blok.rect(s.x * cellSize,
                s.y * cellSize, cellSize, cellSize, 4);
        } else {
            blok.fill(34, 170, 90, 220)
            blok.rect(s.x * cellSize,
                s.y * cellSize, cellSize, cellSize, 4);
        }
    }
}

