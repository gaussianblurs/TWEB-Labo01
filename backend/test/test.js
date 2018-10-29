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
        name: 'repo',
        commits: {
          '2018-10-12': 2,
          '2018-10-16': 2,
        },
      },
    ]
    const b = utils.formatWeeklyCommitsStats(a)
    const diff = (Object.entries(b[0].commits).length - Object.entries(a[0].commits).length)
    assert.deepStrictEqual(diff, 3) // eslint-disable-line
  })
})

describe('Github', function () {
  this.timeout(5000)
  it('Handles pagination', done => {
    const client = new Github()
    client.repoCommits(process.env.OAUTH_TOKEN, 'gaussianblurs/TWEB-Project01', 2, 40)
      .then(data => {
        assert(data.length > 1)
        done()
      }, error => {
        done(error)
      })
  })
})
