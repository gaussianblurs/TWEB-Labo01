/* eslint-disable no-undef */
const assert = require('assert')
const utils = require('../src/utils.js')

describe('YOLO', () => {
  it('NO TIME', () => {
    assert.equal([1, 2, 3].indexOf(4), -1)
  })
})

describe('formatWeeklyCommitsStats', () => {
  it('should fill dates between oldest and latest with 0 commits', () => {
    const a = [
      {
        name: 'repoTest',
        commits: [
          { '2018-10-12': 8 },
          { '2018-10-16': 2 },
        ],
      },
    ]
    console.log(a[0])
    const b = utils.formatWeeklyCommitsStats(a)
    console.log(b[0])

    console.log(`a.length = ${a[0].commits.length}`)
    console.log(`b.length = ${b[0].commits.length}`)

    assert((a[0].commits.length - b[0].commits.length) === 4)
  })
})
