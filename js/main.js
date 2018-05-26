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
let moveCounter = 0; // increment each time two cards are selected
let correctCounter = 0
let twoActiveCards = false; // true when two cards have been selected
let activeCards = []; // img [id 1st card, image 1st card, id 2nd card, image 2nd card]
// let activeCardsQty = activeCards.length; // 0 cards = 0, 1 card = 2, 2 cards = 4
let matchedPair = false; // true when two selected cards are a match
let gameStatus = []; // [timeStamp, moveCounter, twoActiveCards, activeCards, matchedPair]




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




    /* * * COUNT ACTIVE CARDS * * * *
    /* 1 active card selected, return false
    /* 2 active cards selected, return true*/
    activeCards = countActiveCards(activeCards);
    if (activeCards.length === 4) {
      twoActiveCards = true;
    }
    console.log(`twoActiveCards: ${twoActiveCards}`);

    /* * * MOVE COUNTER * * * *
        /*  Increment counter each time two cards are selected
        /*  Update move counter in header */
    moveCounter = updateMoveCounter(moveCounter, twoActiveCards);
    console.log(`moveCounter: ${moveCounter}`);

    /* * * CHECK FOR MATCHED PAIR * * * *
    /* Compare image file for both active cards
    /* If only one active card is selected, result is false
    /* return true or false */
    matchedPair = checkForMatchedPair(activeCards);
    console.log(`matchedPair: ${matchedPair}`);
    if (matchedPair) {
      correctCounter = correctCounter + 1;
    }


    /* * * UPDATE CARD STATUS * * * *
    /* 1 active card: highlight blue
    /* 2 active cards AND match: highlight green, keep cards exposed
    /* 2 active cards AND no match: highlight red, hide cards */
    updateCardStatus(twoActiveCards, matchedPair, activeCards);

    /* * * CHECK GAME STATUS * * * *
    /* Check if game over
    /* Update variables accordingly 
    /* gameStatus = [timeStamp, moveCounter, twoActiveCards, activeCards, matchedPair] */
    gameStatus = checkGameStatus(timeStamp, moveCounter, correctCounter, twoActiveCards, activeCards, matchedPair);
    timeStamp = gameStatus[0];
    moveCounter = gameStatus[1];
    correctCounter = gameStatus[2];
    twoActiveCards = gameStatus[3];
    activeCards = gameStatus[4];
    matchedPair = gameStatus[5];
    console.log(`timeStamp: ${timeStamp}`);
    console.log(`moveCounter: ${moveCounter}`);
    console.log(`correctCounter: ${correctCounter}`);
    console.log(`twoActiveCards: ${twoActiveCards}`);
    console.table(activeCards);
    console.log(`matchedPair: ${matchedPair}`);


  });
}











/* * * * * * * * * * * * Main Functions * * *  * * * * * * * * * */

function gameTimer() {
  // setTime = setTimeout("setTimeFunction( )", 500);
  console.log('timer goes here');
  return '00:30';
}



function countActiveCards(_activeCards) {

  if (_activeCards.length === 4) {
    if (_activeCards[0] === _activeCards[2]) {
      console.log('SAME CARD SELECTED!');
      _activeCards.pop();
      _activeCards.pop();
    }

  }
  console.log(`countActiveCards(): ${_activeCards}`);
  return _activeCards;
}

function checkForMatchedPair(_activeCards) {
  let firstCardImage = _activeCards[1];
  let secondCardImage = _activeCards[3];
  let result = (firstCardImage === secondCardImage) ? true : false;
  console.log(`checkForMatchedPair(): ${result}`);
  return result;
}

function updateMoveCounter(_moveCounter, _twoActiveCards) {
  let moves = document.getElementById('move-counter');
  let incCounter = _moveCounter + 1;
  let counterString = incCounter.toString();
  console.log(`counter: ${counterString}`);

  if (_twoActiveCards) {
    moves.textContent = incCounter;
    return incCounter;
  } else {
    return _moveCounter;
  }
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
    firstCard.classList.add('match-selected');
    secondCard.classList.add('match-selected', 'show-card');
    setTimeout(matched, 500);
  }
  // Two Active Cards AND No Matched Pair
  else {
    firstCard.classList.add('no-match-selected');
    secondCard.classList.add('no-match-selected', 'show-card');
    setTimeout(hideCards, 500);

  }

  function hideCards() {
    console.log('hideCards');
    firstCard.classList.remove('show-card', 'no-match-selected', 'one-selected');
    secondCard.classList.remove('show-card', 'no-match-selected');
  }

  function matched() {
    console.log('matched');
    firstCard.classList.remove('match-selected', 'one-selected');
    secondCard.classList.remove('match-selected');
  }
} // updateCardStatus()

function checkGameStatus(_timeStamp, _moveCounter, _correctCounter, _twoActiveCards, _activeCards, _matchedPair) {
  let gameVariables = [_timeStamp, _moveCounter, _correctCounter, _twoActiveCards, _activeCards, _matchedPair];

  if (_correctCounter === 8) {
    console.log('GAME OVER');
    gameVariables = [0, 0, 0, false, [], false];


  } else if (_twoActiveCards) {
    gameVariables = [_timeStamp, _moveCounter, _correctCounter, false, [], false];
  } else {
    console.log('checkGameStatus: no Update');
  }
  return gameVariables;


}














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