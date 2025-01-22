let runner = document.getElementById('runner');
let coin = document.getElementById('coin');
let scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;

// Move the runner
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        jump();
    }
});

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 150;
    let currentHeight = 0;
    
    let jumpInterval = setInterval(function() {
        if (currentHeight < jumpHeight) {
            currentHeight += 10;
            runner.style.bottom = (10 + currentHeight) + 'px';
        } else {
            clearInterval(jumpInterval);
            fall();
        }
    }, 20);
}

// Fall function
function fall() {
    let fallInterval = setInterval(function() {
        if (runner.style.bottom > '10px') {
            runner.style.bottom = (parseInt(runner.style.bottom) - 10) + 'px';
        } else {
            clearInterval(fallInterval);
            isJumping = false;
        }
    }, 20);
}

// Coin collection and score
function checkCollision() {
    let runnerRect = runner.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();
    
    if (runnerRect.top < coinRect.bottom && runnerRect.bottom > coinRect.top && runnerRect.left < coinRect.right && runnerRect.right > coinRect.left) {
        score += 10;
        scoreDisplay.textContent = 'Score: ' + score;
        moveCoin();
    }
}

// Move the coin to a random position
function moveCoin() {
    let randomX = Math.floor(Math.random() * 350) + 50;
    let randomY = Math.floor(Math.random() * 200) + 100;
    coin.style.left = randomX + 'px';
    coin.style.bottom = randomY + 'px';
}

// Game loop to check for collisions and move the coin
setInterval(function() {
    checkCollision();
}, 100);
