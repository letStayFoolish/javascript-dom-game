// Selecting Elements
const score0El = document.getElementById('score--0') as HTMLParagraphElement;
const score1El = document.getElementById('score--1') as HTMLParagraphElement;
const currentScorePlayer0El = document.getElementById(
  'current--0',
) as HTMLParagraphElement;
const currentScorePlayer1El = document.getElementById(
  'current--1',
) as HTMLParagraphElement;
const diceImg = document.querySelector('.dice') as HTMLImageElement;
const rollDiceBtn = document.querySelector('.btn--roll') as HTMLButtonElement;
const newGameBtn = document.querySelector('.btn--new') as HTMLButtonElement;
const holdBtn = document.querySelector('.btn--hold') as HTMLButtonElement;
const player0Section = document.querySelector('.player--0') as HTMLDivElement;
const player1Section = document.querySelector('.player--1') as HTMLDivElement;

let scores: number[],
  currentScore: number,
  activePlayer: 0 | 1,
  isPlayable: boolean;

// Initial state
function startGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // Player 1 or Player 2
  isPlayable = true;

  diceImg.classList.add('hidden');

  score0El.textContent = '0';
  currentScorePlayer0El.textContent = '0';
  score1El.textContent = '0';
  currentScorePlayer1El.textContent = '0';
}
startGame();

// Rolling dice functionality
function handleRollDice() {
  if (isPlayable) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceImg.classList.remove('hidden');
    diceImg.setAttribute('src', `dice-${randomNumber}.png`);

    // Check if player rolled 1, if true switch to the next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      (
        document.getElementById(`current--${activePlayer}`) as HTMLElement
      ).textContent = String(currentScore);
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  currentScore = 0;
  (
    document.getElementById(`current--${activePlayer}`) as HTMLElement
  ).textContent = '0';
  (
    document.getElementById(`score--${activePlayer}`) as HTMLElement
  ).textContent = String(scores[activePlayer]);

  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
}

function handleHold() {
  if (isPlayable) {
    scores[activePlayer] += currentScore;
    (
      document.getElementById(`score--${activePlayer}`) as HTMLElement
    ).textContent = String(scores[activePlayer]);

    if (scores[activePlayer] >= 100) {
      // End game
      isPlayable = false;
      diceImg.classList.add('hidden');

      (
        document.querySelector(`.player--${activePlayer}`) as HTMLElement
      ).classList.add('player--winner');

      (
        document.querySelector(`.player--${activePlayer}`) as HTMLElement
      ).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
}

rollDiceBtn.addEventListener('click', handleRollDice);
holdBtn.addEventListener('click', handleHold);
newGameBtn.addEventListener('click', () => {
  (
    document.querySelector(`.player--${activePlayer}`) as HTMLElement
  ).classList.remove('player--winner');
  (document.querySelector(`.player--0`) as HTMLElement).classList.add(
    'player--active',
  );
  startGame();
});
