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
let noCardSelected = true;
let firstCard = '';
let secondCard;
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

for (const card of selectedCard) {
  card.addEventListener("click", function () {
    let c = card;
    let ca = c.getAttribute('src');
    console.log('image clicked', card.getAttribute('src'), ca);
    console.log('card:', card);

    if (noCardSelected) {
      console.log('firstCard:', card.getAttribute('src'));
      firstCard = ca;
      console.log('firstCard:', firstCard);
      this.style.border = cardBorder_Selected; //turns li border blue
      noCardSelected = !noCardSelected;
    } else {
      console.log('image already selected, check for match');
      secondCard = ca;
      console.log('secondCard:', ca);
      checkForMatch(firstCard, secondCard);
    }
  })
}

function checkForMatch(_firstCard, _secondCard) {
  if (_firstCard === _secondCard) {
    console.log('IT\'S A MATCH');
  } else {
    console.log('NO MATCH');
  }
  noCardSelected = !noCardSelected;
}




shuffledPairs = shufflePairs(pairs);
console.log(shuffledPairs);
let num = 0;
// let shuffles = 15;
let myVar = setInterval(shuffleImages, time);


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