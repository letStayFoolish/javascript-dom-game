"use strict";
// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScorePlayer0El = document.getElementById('current--0');
const currentScorePlayer1El = document.getElementById('current--1');
const diceImg = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');
// Initial state
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // Player 1 or Player 2
score0El.textContent = '0';
score1El.textContent = '0';
diceImg.classList.add('hidden');
// Rolling dice functionality
function handleRollDice() {
    diceImg.classList.remove('hidden');
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceImg.setAttribute('src', `dice-${randomNumber}.png`);
    // Check if player rolled 1, if true switch to the next player
    if (randomNumber !== 1) {
        document.getElementById(`current--${activePlayer}`).textContent = String((currentScore += randomNumber));
    }
    else {
        switchPlayer();
    }
}
function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    document.getElementById(`score--${activePlayer}`).textContent = String(scores[activePlayer]);
    player0Section.classList.toggle('player--active');
    player1Section.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
}
function handleHold() {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
        // End game
    }
    switchPlayer();
}
rollDiceBtn.addEventListener('click', handleRollDice);
holdBtn.addEventListener('click', handleHold);
console.log('Nemanja');
