class Game {
    constructor() {
        this.gameHolder = document.querySelector('.game');
        this.greenButton = document.querySelector('#green');
        this.redButton = document.querySelector('#red');
        this.yellowButton = document.querySelector('#yellow');
        this.blueButton = document.querySelector('#blue');

        this.gameButtons = [
            this.greenButton,
            this.redButton,
            this.yellowButton,
            this.blueButton
        ];

        this.scoreLabel = document.querySelector('#score');
        this.startLabel = document.querySelector('#start-lbl');
        this.startButton = document.querySelector('#start');
        this.overlay = document.querySelector('#overlay');
        this.isOver = false;

        this.addListeners();
    }

    addListeners() {
        this.startButton.addEventListener('click', this.init.bind(this));

        this.gameButtons.forEach((item) => {
            item.addEventListener('click', this.addToResultArr.bind(this));
        })
    }

    init() {
        this.score = 0;
        this.clickCount = 0;
        this.playSteps = [];
        this.resultArr = [];
        this.isOver = false;
        this.winScore = 20;

        this.enableButtons();
        this.renderScore();
        this.getRandomNumber();
        this.highlightButtons();
    }

    increaseScore() {
        return this.score++;
    }

    renderScore() {
        this.scoreLabel.textContent = '0' + this.score;
    }

    getRandomNumber() {
        return this.playSteps.push(Math.floor(0 + Math.random() * 4));
    }

    highlightButtons() {
        let counter = 0;
        this.overlay.classList.remove('disabled');
        let interval = setInterval(() => {
            if (counter < this.playSteps.length) {
                const currentItem =
                    document.querySelector(`button[data-item='${this.playSteps[counter]}']`);
                currentItem.classList.add('active');

                setTimeout(() => {
                    currentItem.classList.remove('active');
                }, 500);

                counter++;
            } else {
                this.overlay.classList.add('disabled');
                clearInterval(interval);
            }
        }, 1000);
    }

    addToResultArr(e) {
        this.resultArr.push(+e.target.dataset.item);
        this.resultArr.forEach((item, index) => {
            if (this.playSteps[index] !== item) {
                this.isOver = true;
                this.gameOver();
            }
        })

        if (this.playSteps.length === this.resultArr.length && !this.isOver) {
            if (this.score === this.winScore) {
                this.finishGame();
                return
            }
            this.levelUp();
            this.resultArr = [];

            this.getRandomNumber();
            this.highlightButtons();
        }
    }

    gameOver() {
        alert('GAME OVER');
        this.score = 0;
        this.renderScore();
        this.disableButtons();
    }

    levelUp() {
        alert('LEVEL UP');
        this.score++;
        this.renderScore();
    }
    finishGame() {
        alert('YOU ARE WINNER !!!');
        this.score = 0;
        this.renderScore();
    }

    disableButtons() {
        this.gameButtons.forEach((item) => {
            item.setAttribute('disabled', 'disabled');
        })
    }
    enableButtons() {
        this.gameButtons.forEach((item) => {
            item.removeAttribute('disabled', 'disabled');
        })
    }
}


window.onload = () => {
    new Game();
};

module.exports = { Game }