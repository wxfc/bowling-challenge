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

// todo:
// 1. handle frame 10 and gameover 
// 2. reset button
// 3. display score and frames

let gameData = [];
let frameData = {
  frame: 0,
  rollOneScore: 0,
  rollTwoScore: 0,
  frameScore: 0
}

const rollBtn = document.getElementById('roll');
rollBtn.addEventListener('click', () => {
  if (gameData.length === 9) {
    handleFrameTen(gameData);
    document.getElementById('score').innerHTML = score(gameData);
  } else if (gameData[9] !== undefined && gameData[9].frame === 10) {
    // click reset button to start new game
    document.getElementById('resetGame').innerHTML = 'Click Reset to start new game';
  } else {
    roll();
  document.getElementById('score').innerHTML = score(gameData);
  }
});

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
  gameData = [];
  frameData = {
    frame: 0,
    rollOneScore: 0,
    rollTwoScore: 0,
    frameScore: 0
  }
  document.getElementById('score').innerHTML = score(gameData);
  document.getElementById('endGame').innerHTML = '';
  document.getElementById('resetGame').innerHTML = '';
})


let rollOnePins = null 
let rollTwoPins = null 

let frameTenRollOne = null
let frameTenRollTwo = null
let frameTenRollThree = null;

const handleFrameTen = (gdArr) => {
    console.log('frame ten');
  if (frameTenRollOne === null) {
    frameTenRollOne = Math.floor(Math.random() * 11);
    console.log('1:', frameTenRollOne);
  } else if (frameTenRollOne !== null && frameTenRollTwo === null) {
    if (frameTenRollOne === 10) {
      frameTenRollTwo = Math.floor(Math.random() * 11);
      console.log('2:', frameTenRollTwo);
    } else {
      frameTenRollTwo = Math.floor(Math.random() * (10 - frameTenRollOne));
      if (frameTenRollOne + frameTenRollTwo < 10) {
        frameData = {
          frame: 10,
          rollOneScore: frameTenRollOne,
          rollTwoScore: frameTenRollTwo,
          frameScore: frameTenRollOne + frameTenRollTwo,
          result: 'final frame'
        }
        gameData.push(frameData);
        console.log('2:', frameTenRollTwo);
        console.log(gameData);
        document.getElementById('endGame').innerHTML = 'End Game';
        frameTenRollOne = null;
        frameTenRollTwo = null;
      }
    }
  } else {
    if (frameTenRollTwo === 10 || frameTenRollTwo + frameTenRollOne === 10) {
      frameTenRollThree = Math.floor(Math.random() * 11);
    } else {
      frameTenRollThree = Math.floor(Math.random() * (10 - frameTenRollTwo));
    }
    frameData = {
      frame: 10,
      rollOneScore: frameTenRollOne,
      rollTwoScore: frameTenRollTwo,
      rollThreeScore: frameTenRollThree,
      frameScore: frameTenRollOne + frameTenRollTwo + frameTenRollThree,
      result: 'final frame'
    }
    console.log('3:', frameTenRollThree);
    gameData.push(frameData);
    console.log(gameData);
    document.getElementById('endGame').innerHTML = 'End Game';
    frameTenRollOne = null;
    frameTenRollTwo = null;
    frameTenRollThree = null;
  }

}

const roll = () => {
  if (rollOnePins === null) {
    rollOnePins = Math.floor(Math.random() * 11);
    console.log('1:', rollOnePins);
    if (rollOnePins === 10) {
      scoring([rollOnePins, rollTwoPins]);
      rollOnePins = null;
    }
  } else if (rollOnePins !== null) {
    rollTwoPins = Math.floor(Math.random() * (10 - rollOnePins));
    console.log('1:',rollOnePins, '2:',rollTwoPins);
    scoring([rollOnePins, rollTwoPins]);
    rollOnePins = null;
    rollTwoPins = null;
  }
}

const scoring = (arr) => {
  if (arr[0] === 10) {
    frameData = {
      frame: gameData.length + 1,
      rollOneScore: arr[0],
      rollTwoScore: null,
      frameScore: arr[0],
      result: 'strike'
    }
  } else if (arr[0] + arr[1] === 10) {
    frameData = {
      frame: gameData.length + 1,
      rollOneScore: arr[0],
      rollTwoScore: arr[1],
      frameScore: arr[0] + arr[1],
      result: 'spare'
    }
  } else {
    frameData = {
      frame: gameData.length + 1,
      rollOneScore: arr[0],
      rollTwoScore: arr[1],
      frameScore: arr[0] + arr[1],
      result: ''
    }
  }
  gameData.push(frameData);
  checkForSpare(gameData);
  checkForStrike(gameData);
  console.log(gameData);
}

const score = (arr) => {
  let score = 0;
  arr.forEach(frame => {
    score += frame.frameScore;
  });
  return score;
}

const checkForStrike = (gdArr) => {
  let strikeScore = 0;
  for (let i = 0; i < gdArr.length; i++) {
    if (gdArr[i] !== gdArr[0] && gdArr[i-1].result === 'strike') {
      strikeScore = gdArr[i-1].rollOneScore + gdArr[i].rollOneScore;
      if (gdArr[i+1] !== undefined && gdArr[i].rollTwoScore === null)  {
        strikeScore += gdArr[i+1].rollOneScore;
      } else {
        strikeScore += gdArr[i].rollTwoScore;
      }
      gdArr[i-1].frameScore = strikeScore;
    }
  }
}

const checkForSpare = (gdArr) => {
  for (let i = 0; i < gdArr.length; i++) {
    if (gdArr[i] !== gdArr[0] && gdArr[i-1].result === 'spare') {
      gdArr[i-1].frameScore = gdArr[i-1].rollOneScore + gdArr[i-1].rollTwoScore + gdArr[i].rollOneScore;
    }
  }
}