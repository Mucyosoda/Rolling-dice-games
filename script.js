'use strict';
const playBtn = document.querySelector('.mbtn');
const btnRoll = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
const currentPoint = document.querySelector('#current--0');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let land = 0;
let n = 0;
const scoreArr = [0, 0];
const max = [0, 0];
let activePlayer = 0;
let playerOne = 'player 1';
let playerTwo = 'player 2';
const name1 = document.getElementById('name--0');
const name2 = document.getElementById('name--1');

playBtn.addEventListener('click', function () {
  const userName1 = document.getElementById('player-one').value;
  const userName2 = document.getElementById('player-two').value;

  name1.textContent = userName1;
  name2.textContent = userName2;
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});

const disableBtn = function () {
  btnRoll.disabled = true;
  holdBtn.disabled = true;
  newGame.disabled = true;
};

const enableBtn = function () {
  btnRoll.disabled = false;
  holdBtn.disabled = false;
  newGame.disabled = false;
};

const switchMode = function () {
  n = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = n;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
// setTimeout(() => {
//   console.log('Hello after 4 seconds');
// }, 4 * 1000);

//working on button rolling dice
btnRoll.addEventListener('click', function () {
  dice.src = '1.gif';
  disableBtn();
  setTimeout(() => {
    const land = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${land}.png`;
    if (land !== 1) {
      n += land;
      document.querySelector(`#current--${activePlayer}`).textContent = n;
    } else {
      switchMode();
    }
    enableBtn();
  }, 1 * 1000);
});
// working on button hold
holdBtn.addEventListener('click', function () {
  scoreArr[activePlayer] += n;
  //document.getElementById(`score--${activePlayer}`).textContent = scoreArr[activePlayer];
  document.getElementById(`points--${activePlayer}`).textContent =
    scoreArr[activePlayer];
  if (scoreArr[activePlayer] >= 50) {
    document.querySelector(`.wins--${activePlayer}`).classList.remove('hidden');
    document
      .querySelector(`.congz--${activePlayer}`)
      .classList.remove('hidden');
    max[activePlayer] = max[activePlayer] + 1;
    console.log(max[activePlayer]);
    document.getElementById(`max--${activePlayer}`).textContent =
      max[activePlayer];
    disableBtn();
    newGame.disabled = false;
  } else {
    switchMode();
  }
});

//working on new game button
newGame.addEventListener('click', function () {
  dice.src = 'dice-8.png';
  n = 0;
  document.querySelector('#current--0').textContent = n;
  document.querySelector('#current--1').textContent = n;
  scoreArr[0] = 0;
  scoreArr[1] = 0;
  document.getElementById('points--0').textContent = 0;
  document.getElementById('points--1').textContent = 0;
  enableBtn();
  document.querySelector(`.congz--${activePlayer}`).classList.add('hidden');
});
