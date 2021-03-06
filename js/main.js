const row = 4;
const col = 4;
let pairs = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; // image number for x.png
let shuffledPairs = []; //same as above but in a new order

let timeStamp = 0; //string formatted as 00:00 in min:sec
let timerRunning = false; //true when first card clicked and timer starts
let seconds = 0; //timer seconds
let minutes = 0; // timer minutes
let interval; // timer call function every 1s.
let stars = 4; // star rating 0 to 4
let moveCounter = 0; // increment each time two cards are selected
let correctCounter = 0 // number of correct pairs matched, game over = 8
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

    //* * * START TIMER * * * *
    // begin timer when first card is selected
    // end timer when last card is selected
    // timeStamp = gameTimer();
    // console.log(`timeStamp: ${timeStamp}`);
    if (!timerRunning) {
      // clearInterval(Interval);
      Interval = setInterval(startTimer, 1000); // update every 1000ms
      timerRunning = true;
    }
    // TEST IF CLICKED CARD IS ALREADY SHOWING - DO NOTHING
    if (testCard.classList.contains('show-card')) {}
    // CHECK CLICKED CARD
    else {
      activeCards.push(cardID, cardImg);
      // console.table(activeCards);

      //* * * COUNT ACTIVE CARDS * * * *
      // 1 active card selected, return false
      // 2 active cards selected, return true
      twoActiveCards = countActiveCards(activeCards);
      // console.log(`twoActiveCards: ${twoActiveCards}`);

      //* * * MOVE COUNTER * * * *
      // Increment counter each time two cards are selected
      // Update move counter in header
      moveCounter = updateMoveCounter(moveCounter, twoActiveCards);
      // console.log(`moveCounter: ${moveCounter}`);

      //* * * CHECK FOR MATCHED PAIR * * * *
      // Compare image file for both active cards
      // If only one active card is selected, result is false
      // return true or false
      matchedPair = checkForMatchedPair(activeCards);
      // console.log(`matchedPair: ${matchedPair}`);
      if (matchedPair) {
        correctCounter = correctCounter + 1;
      }
      // Set star rating based on moveCounter & correctCounter
      // 
      updateStars(twoActiveCards, moveCounter, correctCounter);

      //* * * UPDATE CARD STATUS * * * *
      //* 1 active card: highlight blue
      //* 2 active cards AND match: highlight green, keep cards exposed
      //* 2 active cards AND no match: highlight red, hide cards
      updateCardStatus(twoActiveCards, matchedPair, activeCards);
      //USE THIS OUTPUT FOR TRACKING STATUS OF VARS
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
      checkGameStatus();

    } // testCard else
  }); // card clicked event listener

} // for-of card



//* * * * * * * * * * * * Main Functions * * *  * * * * * * * * * *

function startTimer() {
  let time = document.getElementById('time');
  let secString;
  let minString;

  seconds++;

  if (seconds <= 9) {
    secString = '0' + seconds;
  }

  if (seconds > 9) {
    secString = seconds;
  }

  if (seconds > 59) {
    seconds = 0;
    secString = '00';
    minutes++;
  }

  if (minutes <= 9) {
    minString = '0' + minutes;
  }

  if (minutes > 9) {
    minString = minutes;
  }

  if (minutes > 59) {
    minString = 'ENDED';
    secString = '';
  }
  timeStamp = `${minString}:${secString}`;
  time.innerHTML = minString + ':' + secString;
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
  return result;
}

function updateMoveCounter(_moveCounter, _twoActiveCards) {
  let moves = document.getElementById('move-counter');
  let incCounter = _moveCounter + 1;
  let counterString = incCounter.toString();

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

  // No Match - Hide Cards
  function hideCards() {
    firstCard.classList.remove('show-card', 'no-match-selected', 'one-selected');
    secondCard.classList.remove('show-card', 'no-match-selected');
  }

  // Match - Keep cards showing
  function matched() {
    // console.log('matched');
    firstCard.classList.remove('match-selected', 'one-selected');
    secondCard.classList.remove('match-selected');
  }
} // updateCardStatus()

// Update stars based on correct moves
function updateStars(twoActiveCards, moveCounter, correctCounter, ) {
  let wrong = moveCounter - correctCounter;
  let star4 = document.getElementById('star4');
  let star3 = document.getElementById('star3');
  let star2 = document.getElementById('star2');
  let star1 = document.getElementById('star1');

  if (twoActiveCards) {

    if (wrong <= 2) {
      stars = 4; // already 4 by default
    } else if (wrong <= 4) {
      star4.classList.add('no-star');
      stars = 3;
    } else if (wrong <= 6) {
      star3.classList.add('no-star');
      stars = 2;
    } else {
      star2.classList.add('no-star');
      stars = 1;
    }
  }
}

function checkGameStatus() {
  if (correctCounter === 8) {
    console.log('GAME OVER');
    gameOver(stars);
    resetVariables();
    resetHeader();


  } else if (twoActiveCards) {
    twoActiveCards = false;
    activeCards = [];
    matchedPair = false;
  } else {}
  return;

  function gameOver(stars) {
    let hideBoard = document.querySelector('.game-board');
    let hideStats = document.querySelector('.game-stats');
    let gameResults = document.querySelector('.game-results')
    let finalTime = document.getElementById('final-time');
    let finalMoves = document.getElementById('final-moves');
    let starRating = document.getElementById('star-rating');
    let starHTML = '';
    let starIcon = "<i class='fas fa-star'></i>"


    for (let i = 0; i < stars; i++) {
      starHTML += starIcon;
    }

    hideBoard.style.display = 'none';
    hideStats.style.display = 'none';
    gameResults.style.display = 'flex';
    starRating.innerHTML = starHTML;
    finalTime.innerHTML = `TIME - ${timeStamp}`;
    finalMoves.innerHTML = `MOVES - ${moveCounter}`;
  }
} // checkGameStatus

function resetVariables() {
  timeStamp = 0;
  clearInterval(Interval);
  seconds = 0;
  minutes = 0;
  timerRunning = false;
  stars = 4;
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