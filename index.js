//Grabbing elements
const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const startBtn = document.querySelector(".startBtn");
const newCardBtn = document.querySelector(".newCardBtn");
const playerEl = document.querySelector("#player-el");

//Declaring & assigning initial variables
let player = {
  name: "Max",
  credit: 140,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

//Disabling new card button onload
window.onload = () => {
  newCardBtn.disabled = true;
};
//Render player info
playerEl.textContent = player.name + ": " + player.credit + "$";

//Main game starting function
function startGame() {
  startBtn.textContent = "Game Running...";
  if (!doesPreviousGameExist()) {
    newGame();
  } else {
    resetGame();
  }
}

//Resets previous data to start a new game
function resetGame() {
  cards = [];
  sum = 0;
  hasBlackJack = false;
  isAlive = false;
  newGame();
}

//Runs only at start to draw first 2 cards
function newGame() {
  isAlive = true;
  if (isGameActive()) {
    startBtn.disabled = true;
  }
  cards[0] = getRandomNum2to11();
  cards[1] = getRandomNum2to11();
  sum += cards[0] + cards[1];
  checkWin();
}

//Check win condition and assign message accordingly
function checkWin() {
  if (sum <= 20) {
    newCardBtn.disabled = false;
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    hasBlackJack = true;
    newCardBtn.disabled = true;
    message = "You've got Blackjack!";
    showResetGameBtn();
  } else {
    isAlive = false;
    newCardBtn.disabled = true;
    message = "You're out of the game!";
    showResetGameBtn();
  }
  displayInfo();
}

//Displaying info in elements
function displayInfo() {
  messageEl.textContent = message;
  sumEl.textContent = "Sum: " + sum;
  //cardsEl.textContent = "Cards: " + cards.join(" + "); Too Simple!
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " + ";
  }
  if (cardsEl.textContent.endsWith(" + ")) {
    cardsEl.textContent = cardsEl.textContent.slice(0, -3);
  }
}

//Draw new card
function drawNewCard() {
  if (isGameActive()) {
    let drawnCard = getRandomNum2to11();
    sum += drawnCard;
    cards.push(drawnCard);
    checkWin();
  }
}

//Return active game status
function isGameActive() {
  return isAlive && !hasBlackJack;
}

//Returns whether player has previously played a game
function doesPreviousGameExist() {
  return sum !== 0;
}

//When player finishes current game, start game btn becomes start new game
function showResetGameBtn() {
  startBtn.textContent = "START NEW GAME";
  startBtn.disabled = false;
}

//Return random num 1-13, considering Ace = 11 & 10-13 = 10
function getRandomNum2to11() {
  let randomNum = Math.floor(Math.random() * 13) + 1;
  if (randomNum === 1) {
    return 11;
  } else if (randomNum >= 10) {
    return 10;
  } else {
    return randomNum;
  }
}
