'use strict';
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const image = document.querySelector('img');

const player = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
// console.log(image);

const playerScore = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];

const currentScore = [
  document.querySelector('.player--0 .current-score'),
  document.querySelector('.player--1 .current-score'),
];

// console.log(currentScore[0]);

let score = [0, 0];
let current = [0, 0];
let active = 0;
let playerWin = false;

const newGame = function () {
  score = [0, 0];
  current = [0, 0];
  if (player[active].classList.contains('player--winner'))
    player[active].classList.remove('player--winner');
  if (player[active].classList.contains('player--active'))
    player[active].classList.remove('player--active');
  active = 0;
  playerScore[0].textContent = 0;
  playerScore[1].textContent = 0;
  currentScore[0].textContent = 0;
  currentScore[1].textContent = 0;
  image.hidden = true;
  playerWin = false;
  player[active].classList.add('player--active');
};

newGame();

const playerWins = function () {
  player[active].classList.add('player--winner');
  playerWin = true;
};

const changeSide = function () {
  //   if (playerWin == true) return;
  score[active] += current[active];
  playerScore[active].textContent = score[active];
  current[active] = 0;
  currentScore[active].textContent = 0;
  if (score[active] + current[active] > 100) {
    playerWins();
    return;
  }
  player[active].classList.remove('player--active');
  active = 1 - active;
  player[active].classList.add('player--active');
};

holdBtn.addEventListener('click', changeSide);

rollDiceBtn.addEventListener('click', function () {
  if (image.hidden == true) image.hidden = false;
  if (playerWin == true) return;
  let rand = Math.trunc(Math.random() * 6) + 1;
  if (rand == 1) {
    current[active] = 0;
    image.src = `dice-${rand}.png`;
    changeSide();
    return;
  }
  current[active] += rand;
  image.src = `dice-${rand}.png`;
  currentScore[active].textContent = current[active];
});

newGameBtn.addEventListener('click', newGame);
