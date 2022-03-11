let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // Renderiza o desenho em canvas
let pontuacao = 0
let txt_pontuacao = document.getElementById("pontuacao")
txt_pontuacao.innerHTML += pontuacao
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; // Direção inicial
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "#363636";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "#FFFAFA";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Detecta evento e chama a função
document.addEventListener('keydown', update);

function update(event) {
    // Código evento do teclado
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    // Caso ultrapasse da tela, começa do outro lado
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over :(");
            alert("Sua pontuação foi: " + pontuacao);
        }
    }
    
    criarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        pontuacao += 1;
        txt_pontuacao.innerHTML = "";
        txt_pontuacao.innerHTML += "Pontuação: " + pontuacao;

        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // Acrescenta na primeira posição do array
}

let jogo = setInterval(iniciarJogo, 100); 