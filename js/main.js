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

let cardCount = 0;
let twoActiveCards = false;
let activeCards = []; // [card#1 id, card#1 image, card#2 id, card#2 image]
let activeCardsQty = activeCards.length; // 0 cards = 0, 1 card = 2, 2 cards = 4
let matchedPair = false;


// COMMENTED OUT VARIABLES
let noCardSelected = true;
let firstCard, secondCard, firstCardID, secondCardID;
let cardBorder_Selected = '5px solid #0505fa';
let cardBorder_Match = '5px solid #05fa05';
let cardBorder_NoMatch = '5px solid #fa0505';


/* * * * * * * * * * * Setup * * * * * * * * * */
shuffledPairs = shufflePairs(pairs);
console.log(shuffledPairs);
let num = 0;
// let shuffles = 15;
let myVar = setInterval(shuffleImages, time);




/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * */
let selectedCard = document.querySelectorAll('img');

for (const card of selectedCard) {
  card.addEventListener("click", function () {
    let cardID = this.id; //e.g. 'image7'
    let cardImg = this.getAttribute('src'); //e.g. 'images/2.png'

    activeCards.push(cardID, cardImg);
    console.table(activeCards);

    /* * * COUNT ACTIVE CARDS * * * *
    /* if two cards have been selected: increment cardCount by 1
    /* return true or false */
    twoActiveCards = countActiveCards(activeCards);
    console.log(`twoActiveCards: ${twoActiveCards}`);

    /* * * CHECK FOR MATCHED PAIR * * * *
    /* Compare image file for both active cards
    /* If there is only one active card selected then result is false
    /* return true or false */
    matchedPair = checkForMatchedPair(activeCards);
    console.log(`matchedPair: ${matchedPair}`);


    /* * * UPDATE CARD STATUS * * * *
    /* One active card: highlight blue
    /* Two active cards match: highlight green, keep cards exposed
    /* two active cards no match: highlight red, hide cards */
    updateCardStatus(twoActiveCards, matchedPair, activeCards);



    // cards_oneSelected = test_oneCardSelected(activeCards);
    // twoActiveCards = highlightCards(activeCards);
    // console.log(`Two Active Cards: ${twoActiveCards}`);

    // test for matched pair and highlight cards
    // matchedPair(twoActiveCards, activeCards);



    // cardPactiveCardsairSelected = highlightFirstCard(cardPair);
    // console.log(`cardPairSelected ${cardPairSelected}`);

    // let c = card;
    // let cid = card.id;
    // let ca = c.getAttribute('src');
    // console.log('image clicked', card.getAttribute('src'), cid);
    // console.log('image id:', document.getElementById(cid));

    // if (noCardSelected) { //first card selected
    //   console.log('firstCard:', card.getAttribute('src'));
    //   firstCard = ca;
    //   firstCardID = cid;
    //   console.log(`firstCard: ${firstCard} firstCardID: ${firstCardID} ${selectedCard}`);
    //   this.style.border = cardBorder_Selected; //turns img border blue
    //   noCardSelected = !noCardSelected;
    // } else if (!noCardSelected) { //second card selected, Cards MATCH
    //   console.log('IT\'s A MATCH!');
    // } else {
    //   console.log('NO MATCH');
    // }
  })
}











/* * * * * * * * * * * * Main Functions * * *  * * * * * * * * * */

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
    firstCard.classList.toggle('one-selected');
  }
  // Two Active Cards AND Matched Pair
  else if (_twoActiveCards && _matchedPair) {
    firstCard.classList.toggle('match-selected');
    secondCard.classList.toggle('match-selected');
  }
  // Two Active Cards AND No Matched Pair
  else {
    firstCard.classList.toggle('no-match-selected');
    secondCard.classList.toggle('no-match-selected');
  }
} // updateCardStatus()


// function highlightCards(_activeCards) {
//   let highlightFirstCard = document.getElementById(_activeCards[0]);

//   // Hightlight the first card selected
//   if (_activeCards.length === 2) {
//     // highlightFirstCard.style.border = cardBorder_Selected;
//     highlightFirstCard.classList.add('one-selected');
//     return false;
//   } else if (_activeCards.length === 4) {
//     return true;

//   } else {
//     console.log(`ERROR: Active Cards = ${_activeCards.length}`);
//     return false;
//   }
// }

// function matchedPair(_twoActiveCards, _activeCards) {
//   let highlightFirstCard = document.getElementById(_activeCards[0]);
//   let highlightSecondCard = document.getElementById(_activeCards[2]);

//   if (_twoActiveCards) {
//     if (_activeCards[1] === _activeCards[3]) {
//       console.log(`Matched Pair: ${_activeCards[1]} = ${_activeCards[3]}`);
//       highlightFirstCard.classList.remove('one-selected');
//       highlightFirstCard.classList.add('match-selected');
//       highlightSecondCard.classList.add('match-selected');
//     } else {
//       highlightFirstCard.classList.remove('one-selected');
//       highlightFirstCard.classList.add('no-match-selected');
//       highlightSecondCard.classList.add('no-match-selected');
//     }
//   } else {
//     console.log('Bypass matchedPair()');
//     return;
//   }
// }











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