//Blackjack game logic:

const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");

let firstCard;
let secondCard;
let cards = [firstCard, secondCard];
let sum = 0;
let hasBlackJack = false;
let isAlive = true;
let message = "";

//Main game start function
function startGame() {
  newGame();
  checkWin();
  displayInfo();
}

function newGame() {
  cards[0] = Math.floor(Math.random() * 10) + 2;
  cards[1] = Math.floor(Math.random() * 10) + 2;
  sum += cards[0] + cards[1];
}

function checkWin() {
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    hasBlackJack = true;
    message = "You've got Blackjack!";
  } else {
    isAlive = false;
    message = "You're out of the game!";
  }
}

function displayInfo() {
  messageEl.textContent = message;
  sumEl.textContent = "Sum: " + sum;
  cardsEl.textContent = "Cards: " + cards.join(" + ");
}

function newCard() {
  let drawnCard = Math.floor(Math.random() * 10) + 2;
  sum += drawnCard;
  cards.push(drawnCard);
  checkWin();
  displayInfo();
}
