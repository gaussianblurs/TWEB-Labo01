/* eslint-disable no-undef */
const assert = require('assert')
const Github = require('../src/Github')
require('../node_modules/dotenv').config()

describe('YOLO', () => {
  it('NO TIME', () => {
    assert.equal([1, 2, 3].indexOf(4), -1)
  })
})

describe('Github', () => {
  it('Handles pagination', () => {
    const client = new Github()
    client.repoCommits(process.env.OAUTH_TOKEN, 'gaussianblurs/TWEB-Project01', 2, 1)
      .then(data => {
        assert(data.length > 1)
        done()
      }, error => {
        done(error)
      })
  })
})
