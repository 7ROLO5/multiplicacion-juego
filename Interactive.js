let currentProblem;
let score = 0;
let level = 1;
let timer = 10;
let timerInterval;
let maxLevel = 5; // Límite de niveles
let maxFactor = 10; // El valor máximo de los factores para multiplicación

function startGame() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('score').innerText = score;
    document.getElementById('level').innerText = level;
    startTimer();
    generateProblem();
}

function generateProblem() {
    if (level > maxLevel) {
        endGame(true); // Si se completan todos los niveles, termina el juego con victoria
        return;
    }

    // Aumentar la dificultad: número más grande
    const factor1 = Math.floor(Math.random() * maxFactor) + 1;
    const factor2 = Math.floor(Math.random() * maxFactor) + 1;

    currentProblem = {
        question: `${factor1} x ${factor2}`,
        answer: factor1 * factor2,
    };

    document.getElementById('problem').innerText = currentProblem.question;
    generateBubbles(currentProblem.answer);
}

function generateBubbles(correctAnswer) {
    const container = document.getElementById('bubble-container');
    container.innerHTML = ''; // Clear previous bubbles

    const correctPosition = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        if (i === correctPosition) {
            bubble.innerText = correctAnswer;
            bubble.onclick = () => correctClick();
        } else {
            const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
            bubble.innerText = wrongAnswer;
            bubble.onclick = () => incorrectClick();
        }

        container.appendChild(bubble);
    }
}

function correctClick() {
    score++;
    document.getElementById('score').innerText = score;
    clearInterval(timerInterval); // Detener el temporizador cuando se acierta
    if (level === maxLevel) {
        endGame(true); // Si es el último nivel, finalizar el juego con victoria
    } else {
        nextLevel();
    }
}

function incorrectClick() {
    alert('¡Respuesta incorrecta! Intenta de nuevo.');
}

function nextLevel() {
    level++;
    document.getElementById('level').innerText = level;
    maxFactor += 2; // Aumentar la dificultad: multiplicadores más grandes
    startGame();
}

function startTimer() {
    timer = 10;
    document.getElementById('timer').innerText = `Tiempo: ${timer}`;
    timerInterval = setInterval(function() {
        timer--;
        document.getElementById('timer').innerText = `Tiempo: ${timer}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert('¡Se acabó el tiempo! Perdiste');
            endGame(false);
        }
    }, 1000);
}

function endGame(victory) {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-message').innerText = victory ? '¡Ganaste!' : '¡Perdiste!';
}

function resetGame() {
    score = 0;
    level = 1;
    maxFactor = 10;
    startGame();
}
