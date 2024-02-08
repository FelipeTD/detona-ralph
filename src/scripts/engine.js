const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
        record: document.querySelector('#record'),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        lives: 3,
        record: 0,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function playAudio(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

function gameOver() {
    clearInterval(state.values.lives);
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert(`Game over! O seu resultado foi ${state.values.result}`);
    restart();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addPoint() {
    state.values.result++;
    state.view.score.textContent = state.values.result;
    state.values.hitPosition = null;
    playAudio('hit.m4a');
}

function removeLife() {
    if (state.values.lives === 0) {
        gameOver();
    } else {
        state.values.lives--;
        state.view.lives.textContent = `x${state.values.lives}`;
        playAudio('miss.mp3');
    }
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                addPoint();
            } else {
                removeLife();
            }
        });
    });
}

function updateRecord() {
    if (state.values.record < state.values.result) {
        state.values.record = state.values.result;
        state.view.record.textContent = state.values.result;
    }
}

function resetView() {
    state.view.lives.textContent = 3;
    state.view.score.textContent = 0;
}

function resetValues() {
    state.values.hitPosition = 0;
    state.values.result = 0;
    state.values.currentTime = 10;
    state.values.lives = 3;
}

function restart() {

    updateRecord();
    resetView();
    resetValues();

    state.actions.timerId = setInterval(randomSquare, 500);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function init() {
    addListenerHitBox();
}

init();