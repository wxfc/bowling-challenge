import { expect,test } from '@jest/globals';
import { rollOne, rollTwo, scoring, checkForStrike, checkForSpare, score } from './utils';

test('first roll is equal or greater', () => {
  let rollOnePins = null
  let rollTwoPins = null
  expect(rollOne()).toBeGreaterThanOrEqual(0);
})

test('first roll is less or equal', () => {
  let rollOnePins = null
  let rollTwoPins = null
  expect(rollOne()).toBeLessThanOrEqual(10);
})

test('second roll is equal or greater', () => {
  let rollOnePins = null
  let rollTwoPins = null
  expect(rollTwo()).toBeGreaterThanOrEqual(0);
})

test('second roll is less or equal', () => {
  let rollOnePins = null
  let rollTwoPins = null
  expect(rollTwo()).toBeLessThanOrEqual(10);
})

test('framedata scoring 5 4', () => {
  let gameData = []
  expect(scoring([5,4])).toStrictEqual({
    frame: gameData.length + 1,
    rollOneScore: 5,
    rollTwoScore: 4,
    frameScore: 9,
    result: ''
  })
})

test('framedata scoring 6 0', () => {
  let gameData = []
  expect(scoring([6,0])).toStrictEqual({
    frame: gameData.length + 1,
    rollOneScore: 6,
    rollTwoScore: 0,
    frameScore: 6,
    result: ''
  })
})

test('framedata scoring strike', () => {
  let gameData = []
  expect(scoring([10,null])).toStrictEqual({
    frame: gameData.length + 1,
    rollOneScore: 10,
    rollTwoScore: null,
    frameScore: 10,
    result: 'strike'
  })
})

test('framedata scoring spare', () => {
  let gameData = []
  expect(scoring([8,2])).toStrictEqual({
    frame: gameData.length + 1,
    rollOneScore: 8,
    rollTwoScore: 2,
    frameScore: 10,
    result: 'spare'
  })
})

test('check for a strike and update strike bonus', () => {
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
        "rollTwoScore": 2,
        "frameScore": 9,
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
        "result": "spare"
    }
  ]
  expect(checkForStrike(data)).toStrictEqual(
    [
    {
        "frame": 1,
        "rollOneScore": 10,
        "rollTwoScore": null,
        "frameScore": 30,
        "result": "strike"
    },
    {
        "frame": 2,
        "rollOneScore": 10,
        "rollTwoScore": null,
        "frameScore": 26,
        "result": "strike"
    },
    {
        "frame": 3,
        "rollOneScore": 10,
        "rollTwoScore": null,
        "frameScore": 20,
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
        "rollTwoScore": 2,
        "frameScore": 9,
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
        "result": "spare"
    }
  ])
})

test('check for spare and update spare bonus', () => {
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
        "rollTwoScore": 2,
        "frameScore": 9,
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
      "rollTwoScore": 3,
      "frameScore": 19,
      "result": "spare"
  },
  {
      "frame": 10,
      "rollOneScore": 9,
      "rollTwoScore": 0,
      "frameScore": 9,
      "result": ""
  }
  ]
  expect(checkForSpare(data)).toStrictEqual(
    [
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
          "frameScore": 17,
          "result": "spare"
      },
      {
          "frame": 5,
          "rollOneScore": 7,
          "rollTwoScore": 3,
          "frameScore": 17,
          "result": "spare"
      },
      {
          "frame": 6,
          "rollOneScore": 7,
          "rollTwoScore": 2,
          "frameScore": 9,
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
          "rollTwoScore": 3,
          "frameScore": 19,
          "result": "spare"
      },
      {
          "frame": 10,
          "rollOneScore": 9,
          "rollTwoScore": 0,
          "frameScore": 9,
          "result": ""
      }
    ]
  )
})

test('score handling', () => {
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
        "result": "spare"
    }
  ]
  expect(score(data)).toBe(88)
})