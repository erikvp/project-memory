console.log('connected');
let card0 = document.getElementById('card0');
let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');

let time = 500;
let shuffles = 5;
let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let shuffledArray = [];


shuffledArray = shuffleArray(array);
console.log(shuffledArray);
shuffleImages();


function shuffleImages() {
  card0.src = 'images/' + shuffledArray[0] + '.png';
  card2.src = 'images/' + shuffledArray[2] + '.png';
  card4.src = 'images/' + shuffledArray[4] + '.png';
  card6.src = 'images/' + shuffledArray[6] + '.png';
  card8.src = 'images/' + shuffledArray[8] + '.png';
  card10.src = 'images/' + shuffledArray[10] + '.png';


  shuffles--;

  if (shuffles > 0) {
    shuffledArray = shuffleArray(array);
    setTimeout(shuffleImages, time);

  } else {
    console.log('shuffle complete:', shuffles);
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