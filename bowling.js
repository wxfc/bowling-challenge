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
const data = [
  {
      "frame": 1,
      "rollOneScore": 10,
      "rollTwoScore": null,
      "frameScore": 10,
      "result": "strike"
  },
  {
      "frame": 2,
      "rollOneScore": 10,
      "rollTwoScore": null,
      "frameScore": 10,
      "result": "strike"
  },
  {
      "frame": 3,
      "rollOneScore": 10,
      "rollTwoScore": null,
      "frameScore": 10,
      "result": "strike"
  },
  {
      "frame": 4,
      "rollOneScore": 6,
      "rollTwoScore": 4,
      "frameScore": 10,
      "result": "spare"
  },
  {
      "frame": 5,
      "rollOneScore": 7,
      "rollTwoScore": 3,
      "frameScore": 10,
      "result": "spare"
  },
  {
      "frame": 6,
      "rollOneScore": 7,
      "rollTwoScore": 3,
      "frameScore": 10,
      "result": ""
  },
  {
      "frame": 7,
      "rollOneScore": 3,
      "rollTwoScore": 1,
      "frameScore": 4,
      "result": ""
  },
  {
      "frame": 8,
      "rollOneScore": 4,
      "rollTwoScore": 2,
      "frameScore": 6,
      "result": ""
  },
  {
      "frame": 9,
      "rollOneScore": 7,
      "rollTwoScore": 1,
      "frameScore": 8,
      "result": ""
  },
  {
      "frame": 10,
      "rollOneScore": 9,
      "rollTwoScore": 1,
      "frameScore": 10,
      "result": ""
  },
  {
      "frame": 11,
      "rollOneScore": 7,
      "rollTwoScore": 3,
      "frameScore": 10,
      "result": "spare"
  }
]

let pinsKnockedDown = [];
let rollNum = 0;

const rollBtn = document.getElementById('roll');
rollBtn.addEventListener('click', () => {
  rollNum++;
  roll();
  document.getElementById('score').innerHTML = score();
});

const checkForStrike = (gdArr) => {
  let strikeScore = 0;
  for (let i = 0; i < gdArr.length; i++) {
    if (gdArr[i] !== gdArr[0] && gdArr[i-1].result === 'strike') {
      strikeScore = gdArr[i-1].rollOneScore + gdArr[i].rollOneScore;
      if (gdArr[i].rollTwoScore === null)  {
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

let rollOnePins = 0
let rollTwoPins = 0

const roll = () => {
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
  checkForSpare(data);
  checkForStrike(data);
  console.log(data);
  if (gameData[gameData.length-1].frame === 10) {
    console.log('game over');
    console.log(gameData)
  }
}

const score = () => {
  let score = 0;
  gameData.forEach(frame => {
    score += frame.frameScore;
  });
  return score;
}



