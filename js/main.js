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

let time = 50;
let pairs = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
let shuffledPairs = [];

let twoActiveCards = false;
let activeCards = [];
let activeCardsQty = activeCards.length;


// COMMENTED OUT VARIABLES
let noCardSelected = true;
let firstCard, secondCard, firstCardID, secondCardID;
let cardBorder_Selected = '5px solid #0505fa';
let cardBorder_Match = '5px solid #05fa05';
let cardBorder_NoMatch = '5px solid #fa0505';


let selectedCard = document.querySelectorAll('img');
// for (let i = 0; i < 16; i++) {
//   selectedimage[i].addEventListener("click", function () {
//     if (noimageSelected) {
//       this.style.border = "5px solid #0505fa";
//       console.log(noimageSelected);
//       noimageSelected = false;
//       console.log(noimageSelected);

//     } else {
//       console.log('one image already selected');

//     }
//   })
// }

/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * */

for (const card of selectedCard) {
  card.addEventListener("click", function () {
    let cardID = this.id;
    let cardImg = this.getAttribute('src');

    activeCards.push(cardID, cardImg);
    console.table(activeCards);

    // cards_oneSelected = test_oneCardSelected(activeCards);
    twoActiveCards = highlightCards(activeCards);
    console.log(`Two Active Cards: ${twoActiveCards}`);

    // test for matched pair and highlight cards
    matchedPair(twoActiveCards, activeCards);



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

/* * * * * * * * * * * Setup * * * * * * * * * */
shuffledPairs = shufflePairs(pairs);
console.log(shuffledPairs);
let num = 0;
// let shuffles = 15;
let myVar = setInterval(shuffleImages, time);






/* * * * * * * * * * * * Function * * *  * * * * * * * * * */

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

// function test_oneCardSelected(_activeCards) {
//   if (_activeCards.length === 2) {
//     return true;
//   } else {
//     return false;
//   }
// }

function highlightCards(_activeCards) {
  let highlightFirstCard = document.getElementById(_activeCards[0]);

  // Hightlight the first card selected
  if (_activeCards.length === 2) {
    // highlightFirstCard.style.border = cardBorder_Selected;
    highlightFirstCard.classList.add('one-selected');
    return false;
  } else if (_activeCards.length === 4) {
    return true;

  } else {
    console.log(`ERROR: Active Cards = ${_activeCards.length}`);
    return false;
  }
}

function matchedPair(_twoActiveCards, _activeCards) {
  let highlightFirstCard = document.getElementById(_activeCards[0]);
  let highlightSecondCard = document.getElementById(_activeCards[2]);

  if (_twoActiveCards) {
    if (_activeCards[1] === _activeCards[3]) {
      console.log(`Matched Pair: ${_activeCards[1]} = ${_activeCards[3]}`);
      highlightFirstCard.classList.remove('one-selected');
      highlightFirstCard.classList.add('match-selected');
      highlightSecondCard.classList.add('match-selected');
    } else {
      highlightFirstCard.classList.remove('one-selected');
      highlightFirstCard.classList.add('no-match-selected');
      highlightSecondCard.classList.add('no-match-selected');
    }
  } else {
    console.log('Bypass matchedPair()');
    return;
  }
}