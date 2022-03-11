// 10 pin bowling app
// 2 rolls per frame
// 10 frames per game
// 1 player
// spare - 2 rolls in frame
// if spare, the next roll is added to the previous frames score and current score
// strike - 1 roll in frame
// if strike, the next two rolls are added to the previous frames score and current score
// 1 - 10 pins
// 2

let gameData = [];
let frameData = {
  frame: 0,
  rollOneScore: 0,
  rollTwoScore: 0,
  frameScore: 0
}

const rollBtn = document.getElementById('roll');

let rollOnePins = 0
let rollTwoPins = 0

const roll = () => {
  // if rollOnePins is 0
  if (rollOnePins === 0) {
    rollOnePins = Math.floor(Math.random() * 10) + 1;
    console.log('1:', rollOnePins);
 
  } else if (rollOnePins > 1) {
    rollTwoPins = Math.floor(Math.random() * (10-rollOnePins)) + 1;
    console.log('1:',rollOnePins, '2:',rollTwoPins);
    rollOnePins = 0;
    rollTwoPins = 0;
  }
}





// add event listener to roll button
rollBtn.addEventListener('click', () => {
  roll();
});

