console.log('connected');

const row = 4;
const col = 4;
let pairs = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; // image number for x.png
let shuffledPairs = []; //same as above but in a new order

let timeStamp = 0;
let moveCounter = 0; // increment each time two cards are selected
let correctCounter = 0
let twoActiveCards = false; // true when two cards have been selected
let activeCards = []; // img [id 1st card, image 1st card, id 2nd card, image 2nd card]
let matchedPair = false; // true when two selected cards are a match


/* * * * * * * * * * * Setup * * * * * * * * * */
shuffledPairs = shufflePairs(pairs);
makeGrid(row, col, shuffledPairs);


/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * */
let selectedCard = document.querySelectorAll('img');
let restartGame = document.getElementById('reset-button');
let playAgain = document.querySelector('button');


// RESTART GAME USING PLAY AGAIN BUTTON
playAgain.addEventListener('click', function () {
  console.log('PLAY AGAIN CLICKED - RESTART GAME');
  shuffledPairs = shufflePairs(pairs);
  shuffleImages(shuffledPairs);
  resetVariables();
  resetHeader();
  resetGameBoard();
});

// RESTART GAME USING RESET BUTTON
restartGame.addEventListener('click', function () {
  console.log('RESET CLICKED - RESTART GAME');
  shuffledPairs = shufflePairs(pairs);
  shuffleImages(shuffledPairs);
  resetVariables();
  resetHeader();

});

// EVENT LISTENERS FOR 16 CARDS
for (let card of selectedCard) {
  // CHECK FOR CLICKED IMAGE
  card.addEventListener('click', function () {
    let cardID = this.id; //e.g. 'image7'
    let cardImg = this.getAttribute('src'); //e.g. 'images/2.png'
    let testCard = document.getElementById(cardID);

    if (testCard.classList.contains('show-card')) {
      console.log('this card is already selected')
    } else {
      activeCards.push(cardID, cardImg);
      // console.table(activeCards);


      //* * * START TIMER * * * *
      //* begin timer when first card is selected
      //* end timer when last card is selected 
      timeStamp = gameTimer();
      // console.log(`timeStamp: ${timeStamp}`);


      //* * * COUNT ACTIVE CARDS * * * *
      //* 1 active card selected, return false
      //* 2 active cards selected, return true
      twoActiveCards = countActiveCards(activeCards);
      // console.log(`twoActiveCards: ${twoActiveCards}`);

      //* * * MOVE COUNTER * * * *
      //*  Increment counter each time two cards are selected
      //*  Update move counter in header
      moveCounter = updateMoveCounter(moveCounter, twoActiveCards);
      // console.log(`moveCounter: ${moveCounter}`);

      //* * * CHECK FOR MATCHED PAIR * * * *
      //* Compare image file for both active cards
      //* If only one active card is selected, result is false
      //* return true or false
      matchedPair = checkForMatchedPair(activeCards);
      // console.log(`matchedPair: ${matchedPair}`);
      if (matchedPair) {
        correctCounter = correctCounter + 1;
      }


      //* * * UPDATE CARD STATUS * * * *
      //* 1 active card: highlight blue
      //* 2 active cards AND match: highlight green, keep cards exposed
      //* 2 active cards AND no match: highlight red, hide cards
      updateCardStatus(twoActiveCards, matchedPair, activeCards);
      if (twoActiveCards) {
        console.log('* * * * * MOVE STATS * * * * *');
        // console.log(`timeStamp: ${timeStamp}`);
        console.log(`moveCounter: ${moveCounter}`);
        console.log(`correctCounter: ${correctCounter}`);
        console.log(`twoActiveCards: ${twoActiveCards}`);
        console.table(activeCards);
        console.log(`matchedPair: ${matchedPair}`);
        console.log('* * * * * * * * * * * * * * * *');
      }


      //* * * CHECK GAME STATUS * * * *
      //* Check if game over
      //* Update variables accordingly 
      //* gameStatus = [timeStamp, moveCounter, twoActiveCards, activeCards, matchedPair]
      // checkGameStatus(timeStamp, moveCounter, correctCounter, twoActiveCards, activeCards, matchedPair);
      checkGameStatus();
      console.log('* * * * * RESET VARS * * * * *');
      // console.log(`timeStamp: ${timeStamp}`);
      console.log(`moveCounter: ${moveCounter}`);
      console.log(`correctCounter: ${correctCounter}`);
      console.log(`twoActiveCards: ${twoActiveCards}`);
      console.log(`activeCards: ${activeCards}`);
      console.log(`matchedPair: ${matchedPair}`);
      console.log('* * * * * * * * * * * * * * * *');

    } // testCard else
  }); // card clicked event listener

} // for-of card






//* * * * * * * * * * * * Main Functions * * *  * * * * * * * * * *

function gameTimer() {
  // setTime = setTimeout("setTimeFunction( )", 500);
  // console.log('timer goes here');
  return '00:30';
}


function countActiveCards(activeCards) {
  if (activeCards.length === 4) {
    return true;
  } else {
    return false;
  }
}

function checkForMatchedPair(activeCards) {
  let firstCardImage = activeCards[1];
  let secondCardImage = activeCards[3];
  let result = (firstCardImage === secondCardImage) ? true : false;
  // console.log(`checkForMatchedPair(): ${result}`);
  return result;
}

function updateMoveCounter(_moveCounter, _twoActiveCards) {
  let moves = document.getElementById('move-counter');
  let incCounter = _moveCounter + 1;
  let counterString = incCounter.toString();

  if (_twoActiveCards) {
    moves.textContent = incCounter;
    // console.log(`counter: ${incCounter}`);
    return incCounter;
  } else {
    return _moveCounter;
  }
}

function updateCardStatus(_twoActiveCards, _matchedPair, _activeCards) {
  let firstCard = document.getElementById(activeCards[0]);
  let secondCard = document.getElementById(activeCards[2]);

  // Check if card selected is already showing
  if (firstCard === null) {
    return;
  }
  // One Active Card
  else if (!_twoActiveCards) {
    firstCard.classList.add('one-selected', 'show-card');
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
    // console.log('matched');
    firstCard.classList.remove('match-selected', 'one-selected');
    secondCard.classList.remove('match-selected');
  }
} // updateCardStatus()

function checkGameStatus() {
  if (correctCounter === 8) {
    console.log('GAME OVER');
    gameOver();
    resetVariables();
    resetHeader();


  } else if (twoActiveCards) {
    console.log('Game Status: Two Active Cards');
    twoActiveCards = false;
    activeCards = [];
    matchedPair = false;
    console.table(activeCards);
  } else {
    console.log('GameStatus: no Update');
  }
  return;

  function gameOver() {
    let hideBoard = document.querySelector('.game-board');
    let hideStats = document.querySelector('.game-stats');
    let gameResults = document.querySelector('.game-results')
    hideBoard.style.display = 'none';
    hideStats.style.display = 'none';
    gameResults.style.display = 'block';
  }
} // checkGameStatus

function resetVariables() {
  timeStamp = 0;
  moveCounter = 0;
  correctCounter = 0;
  twoActiveCards = false;
  activeCards = [];
  matchedPair = false;
}

function resetHeader() {
  let stars = document.getElementsByClassName('fa-star');
  let timer = document.getElementById('time');
  let moves = document.getElementById('move-counter');

  // Reset to 4 stars
  for (let i = 0; i < 4; i++) {
    if (stars[i].classList.contains('no-star')) {
      stars[i].classList.remove('no-star');
    }
  }

  timer.textContent = '00:00';
  moves.textContent = '0';
}

function resetGameBoard() {
  let showBoard = document.querySelector('.game-board');
  let showStats = document.querySelector('.game-stats');
  let hideResults = document.querySelector('.game-results')
  showBoard.style.display = 'block';
  showStats.style.display = 'flex';
  hideResults.style.display = 'none';
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

// GENERATE CARD TABLE
function makeGrid(_row, _col, _shuffledPairs) {
  let table = '';
  let cardTable = document.getElementById('card-table');
  let idNum = 0;

  //Create grid rows
  for (let r = 0; r < _row; r++) {

    table += '<tr class="cards-row">'; // add row opening with <tr> tag
    //Create grid columns
    for (let c = 0; c < _col; c++) {
      let img = `<img id='image${idNum}' src='images/${_shuffledPairs[idNum]}.png' alt='nautical flag'>`;
      let tdImgString = `<td class='card' id='card${idNum}'> ${img}</td>`;

      table += tdImgString; // add cols
      idNum++;

    }
    //add closing </tr> tag to each completed row
    table += '</tr>';
  }
  // add table elements inside of <table id='card-table'></table>
  cardTable.innerHTML = table;
}

function shuffleImages(shuffledPairs) {

  for (let i = 0; i < 16; i++) {
    let cardImg = document.getElementById(`image${i}`);
    // console.log(cardImg);
    cardImg.src = `images/${shuffledPairs[i]}.png`;
    // console.log(cardImg);
    if (cardImg.classList.contains('show-card')) {
      cardImg.classList.remove('show-card');
    }
  }
}