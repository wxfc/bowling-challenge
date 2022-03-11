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
    if (rollOnePins === 10) {
      scoring([rollOnePins, rollTwoPins]);
      rollOnePins = 0;
    }
  } else if (rollOnePins > 0) {
    rollTwoPins = Math.floor(Math.random() * (10-rollOnePins)) + 1;
    console.log('1:',rollOnePins, '2:',rollTwoPins);
    scoring([rollOnePins, rollTwoPins]);
    rollOnePins = 0;
    rollTwoPins = 0;
  }
}

const scoring = (arr) => {
  if (arr[0] === 10) {
    frameData = {
      frame: gameData.length + 1,
      rollOneScore: 10,
      rollTwoScore: null,
      frameScore: 10,
      strike: true
    }
  } else {
    frameData = {
      frame: gameData.length + 1,
      rollOneScore: arr[0],
      rollTwoScore: arr[1],
      frameScore: arr[0] + arr[1]
    }
  }
  gameData.push(frameData);
  console.log(gameData);
  if (gameData[gameData.length-1].frame === 10) {
    console.log('game over');
  }
}

// foreach gameData.framscore add to score
const score = () => {
  let score = 0;
  gameData.forEach(frame => {
    score += frame.frameScore;
  });
  return score;
}

// add event listener to roll button
rollBtn.addEventListener('click', () => {
  roll();
  document.getElementById('score').innerHTML = score();
});

