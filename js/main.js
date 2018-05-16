console.log('connected');
let card0 = document.getElementById('card0');
let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');
let card4 = document.getElementById('card4');
let card5 = document.getElementById('card5');
let card6 = document.getElementById('card6');
let card7 = document.getElementById('card7');
let card8 = document.getElementById('card8');
let card9 = document.getElementById('card9');
let card10 = document.getElementById('card10');
let card11 = document.getElementById('card11');
let card12 = document.getElementById('card12');
let card13 = document.getElementById('card13');
let card14 = document.getElementById('card14');
let card15 = document.getElementById('card15');


let cardArr = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15];

let time = 200;
let shuffles = 15;
let i = 0;
let array = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
let shuffledArray = [];


shuffledArray = shuffleArray(array);
console.log(shuffledArray);
// shuffleImages();
let myVar = setInterval(shuffleImages, 100);


function shuffleImages() {
  cardArr[i].src = 'images/' + shuffledArray[shuffles] + '.png';
  console.log(`card: ${i} = `, cardArr[i].src);
  shuffles--;
  i++;

  if (shuffles < 0) {
    clearInterval(myVar);
  }

}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}