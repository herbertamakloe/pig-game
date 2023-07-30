'use strict';

const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const players = document.querySelectorAll('.player');

const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');

let scores = [0, 0];

let scoreCounter = 0;
let activePlayer = 0;
let playing = true;

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    //1. Start by generating a random dice roll
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    console.log(randomDice);

    //2. Display dice
    diceImg.classList.remove('hide-dice');
    diceImg.src = `dice-${randomDice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (randomDice !== 1) {
      scoreCounter += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        scoreCounter;
    } else {
      switchPlayer();
    }
  }
});

//Hold Score Button
holdBtn.addEventListener('click', function () {
  if (playing) {
    //1. Add current score (scoreCounter) to active player score
    scores[activePlayer] += scoreCounter;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceImg.classList.add('hide-dice');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//New Game Button
newGameBtn.addEventListener('click', resetFunc);

function resetFunc() {
  scores = [0, 0];
  playing = true;
  scoreCounter = 0;
  activePlayer = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  diceImg.classList.add('hide-dice');
}

//Switching player function
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  scoreCounter = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //This where we change active player
  diceImg.classList.add('hide-dice');
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

//Calling reset function
resetFunc();
