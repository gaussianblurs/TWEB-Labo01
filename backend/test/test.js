/* eslint-disable no-undef */
const assert = require('assert')
const utils = require('../src/utils.js')
const Github = require('../src/Github')
require('../node_modules/dotenv').config()

describe('YOLO', () => {
  it('NO TIME', () => {
    assert.equal([1, 2, 3].indexOf(4), -1)
  })
})

describe('formatWeeklyCommitsStats', () => {
  it('should fill dates between oldest and latest with 0 commits', () => {
    const a = [
      {
        name: 'Aksumiron/test',
        commits: {
          '2018-10-12': 2,
          '2018-10-16': 2,
        },
      },
    ]
    const b = utils.formatWeeklyCommitsStats(a)
    assert((Object.entries(a[0].commits).length - Object.entries(b[0].commits).length) !== 3)
  })
})

describe('Github', () => {
  it('Handles pagination', (done) => {
    const client = new Github()
    client.repoCommits(process.env.OAUTH_TOKEN, 'gaussianblurs/TWEB-Project01', 2, 80)
      .then(data => {
        assert(data.length > 1)
        done()
      }, error => {
        done(error)
      })
  })
})
