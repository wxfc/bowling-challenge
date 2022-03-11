let rollOnePins = null
let rollTwoPins = null
let gameData = []
let frameData = {}

export const rollOne = () => {
  if (rollOnePins === null) {
    rollOnePins = Math.floor(Math.random() * 11);
  } 
  // else if (rollOnePins !== null) {
  //   // random number between 0 and (10 - rollOnePins)
  //   rollTwoPins = Math.floor(Math.random() * (10 - rollOnePins));
  // }
  return rollOnePins;
}

export const rollTwo = () => {
  if (rollOnePins === null) {
    rollOnePins = Math.floor(Math.random() * 11);
  } 
  else if (rollOnePins !== null) {
    // random number between 0 and (10 - rollOnePins)
    rollTwoPins = Math.floor(Math.random() * (10 - rollOnePins));
  }
  return rollTwoPins;
}

export const scoring = (arr) => {
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
  return frameData;
}

export const checkForStrike = (gdArr) => {
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
  return gdArr;
}

export const checkForSpare = (gdArr) => {
  for (let i = 0; i < gdArr.length; i++) {
    if (gdArr[i] !== gdArr[0] && gdArr[i-1].result === 'spare') {
      gdArr[i-1].frameScore = gdArr[i-1].rollOneScore + gdArr[i-1].rollTwoScore + gdArr[i].rollOneScore;
    }
  }
  return gdArr;
}

export const score = (arr) => {
  let score = 0;
  arr.forEach(frame => {
    score += frame.frameScore;
  });
  return score;
}