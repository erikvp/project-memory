console.log('connected');
let image0 = document.getElementById('image0');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let image4 = document.getElementById('image4');
let image5 = document.getElementById('image5');
let image6 = document.getElementById('image6');
let image7 = document.getElementById('image7');
let image8 = document.getElementById('image8');
let image9 = document.getElementById('image9');
let image10 = document.getElementById('image10');
let image11 = document.getElementById('image11');
let image12 = document.getElementById('image12');
let image13 = document.getElementById('image13');
let image14 = document.getElementById('image14');
let image15 = document.getElementById('image15');
let imageArr = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15];

let time = 50; //delay time between each card being shuffled
let pairs = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; // image number for x.png
let shuffledPairs = []; //same as above but in a new order

let timeStamp = 0;
let moveCounter = 0; // increment each time a card is selected
let twoActiveCards = false; // true when two cards have been selected
let activeCards = []; // img [id 1st card, image 1st card, id 2nd card, image 2nd card]
let activeCardsQty = activeCards.length; // 0 cards = 0, 1 card = 2, 2 cards = 4
let matchedPair = false; // true when two selected cards are a match



/* * * * * * * * * * * Setup * * * * * * * * * */
shuffledPairs = shufflePairs(pairs);
console.log(shuffledPairs);
let num = 0;
// let shuffles = 15;
let myVar = setInterval(shuffleImages, time);




/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * */
let selectedCard = document.querySelectorAll('img');
let restartGame = document.getElementById('reset-button');


restartGame.addEventListener('click', function () {
  console.log('RESTART GAME');
});

for (const card of selectedCard) {
  card.addEventListener('click', function () {
    let cardID = this.id; //e.g. 'image7'
    let cardImg = this.getAttribute('src'); //e.g. 'images/2.png'

    activeCards.push(cardID, cardImg);
    console.table(activeCards);

    /* * * START TIMER * * * *
    /* begin timer when first card is selected
    /* end timer when last card is selected */
    timeStamp = gameTimer();
    console.log(`timeStamp: ${timeStamp}`);


    /* * * MOVE COUNTER * * * *
    /*  Increment counter each time a card is selected
    /*  Update move counter in header */
    moveCounter = updateMoveCounter(moveCounter);
    console.log(`moveCounter: ${moveCounter}`);

    /* * * COUNT ACTIVE CARDS * * * *
    /* 1 active card selected, return false
    /* 2 active cards selected, return true*/
    twoActiveCards = countActiveCards(activeCards);
    console.log(`twoActiveCards: ${twoActiveCards}`);

    /* * * CHECK FOR MATCHED PAIR * * * *
    /* Compare image file for both active cards
    /* If only one active card is selected, result is false
    /* return true or false */
    matchedPair = checkForMatchedPair(activeCards);
    console.log(`matchedPair: ${matchedPair}`);


    /* * * UPDATE CARD STATUS * * * *
    /* 1 active card: highlight blue
    /* 2 active cards AND match: highlight green, keep cards exposed
    /* 2 active cards AND no match: highlight red, hide cards */
    updateCardStatus(twoActiveCards, matchedPair, activeCards);


  });
}











/* * * * * * * * * * * * Main Functions * * *  * * * * * * * * * */

function gameTimer() {
  // setTime = setTimeout("setTimeFunction( )", 500);
  console.log('timer goes here');
}

function updateMoveCounter(_moveCounter) {
  let moves = document.getElementById('move-counter');
  let counter = _moveCounter + 1;
  let counterString = counter.toString();
  console.log(`counter: ${counterString}`);

  moves.textContent = counter;
  return counter;

}

function countActiveCards(_activeCards) {
  let numCards = _activeCards.length / 2;
  let result = (numCards === 2) ? true : false;
  console.log(`countActiveCards(): ${result}`);
  return result;
}

function checkForMatchedPair(_activeCards) {
  let firstCardImage = _activeCards[1];
  let secondCardImage = _activeCards[3];
  let result = (firstCardImage === secondCardImage) ? true : false;
  console.log(`checkForMatchedPair(): ${result}`);
  return result;
}

function updateCardStatus(_twoActiveCards, _matchedPair, _activeCards) {
  let firstCard = document.getElementById(activeCards[0]);
  let secondCard = document.getElementById(activeCards[2]);


  // One Active Card
  if (!_twoActiveCards) {
    firstCard.classList.add('one-selected', 'show-card');
    // firstCard.classList.add('show-card');
  }
  // Two Active Cards AND Matched Pair
  else if (_twoActiveCards && _matchedPair) {
    firstCard.classList.toggle('match-selected');
    secondCard.classList.add('match-selected', 'show-card');
  }
  // Two Active Cards AND No Matched Pair
  else {
    firstCard.classList.toggle('no-match-selected');
    secondCard.classList.add('no-match-selected', 'show-card');

  }
} // updateCardStatus()
















/* * * * * * * * * * * * Setup Functions * * *  * * * * * * * * * */

function shuffleImages() {
  imageArr[num].src = 'images/' + shuffledPairs[num] + '.png';

  num++;

  if (num === imageArr.length) {
    clearInterval(myVar);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shufflePairs(pairs) {
  let currentIndex = pairs.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = pairs[currentIndex];
    pairs[currentIndex] = pairs[randomIndex];
    pairs[randomIndex] = temporaryValue;
  }

  return pairs;
}