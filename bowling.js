let gameData = [];
let frameData = {
  frame: 0,
  rollOneScore: 0,
  rollTwoScore: 0,
  frameScore: 0
}
let rollCount = 0;

const rollBtn = document.getElementById('roll');
rollBtn.addEventListener('click', () => {
  if (gameData.length === 9) {
    rollCount++;
    numOfRolls.innerHTML = rollCount;
    handleFrameTen(gameData);
    document.getElementById('score').innerHTML = score(gameData);
  } else if (gameData[9] !== undefined && gameData[9].frame === 10) {
    // click reset button to start new game
    document.getElementById('resetGame').innerHTML = 'Click Reset to start new game';
  } else {
    rollCount++;
    numOfRolls.innerHTML = rollCount;
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
  document.getElementById('framesListed').innerHTML = '';
})

const frameDisplay = document.getElementById('framesListed');
const numOfRolls = document.getElementById('numOfRolls');

let rollOnePins = null 
let rollTwoPins = null 

let frameTenRollOne = null
let frameTenRollTwo = null
let frameTenRollThree = null;

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
      result: 'done'
    }
  }
  gameData.push(frameData);
  checkForSpare(gameData);
  checkForStrike(gameData);
  appendFrame(gameData);
  console.log(gameData);
}

const score = (arr) => {
  let score = 0;
  arr.forEach(frame => {
    score += frame.frameScore;
  });
  return score;
}

const appendFrame = (arr) => {
  let frameArr = arr.slice();
  frameArr.forEach(frame => {
    if (document.getElementById(`frame${frame.frame}`) === null) {
      let li = document.createElement('li');
      li.setAttribute('id', `frame${frame.frame}`);
      li.innerHTML = `Frame ${frame.frame}: ${frame.frameScore} ${frame.result === 'strike' ? 'X' : frame.result === 'spare' ? '/' : ''}`;
      frameDisplay.appendChild(li);
    } else {
      document.getElementById(`frame${frame.frame}`).innerHTML = `Frame ${frame.frame}: ${frame.frameScore} ${frame.result === 'strike' ? 'X' : frame.result === 'spare' ? '/' : ''}`;
    }
  })
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
      checkForSpare(gameData);
      checkForStrike(gameData);
      appendFrame(gameData);
      console.log(gameData);
      document.getElementById('endGame').innerHTML = 'End of Game';
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
    rollThreeScore: 10,
    frameScore: frameTenRollOne + frameTenRollTwo + frameTenRollThree,
    result: 'final frame'
  }
  console.log('3:', frameTenRollThree);
  gameData.push(frameData);
  checkForSpare(gameData);
  checkForStrike(gameData);
  appendFrame(gameData);
  console.log(gameData);
  document.getElementById('endGame').innerHTML = 'End of Game';
  frameTenRollOne = null;
  frameTenRollTwo = null;
  frameTenRollThree = null;
}

}