// loads environment variables
require('dotenv/config')
const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')
const Github = require('./src/Github')
const utils = require('./src/utils')

const app = express()
const port = process.env.PORT || 3000
const client = new Github({ token: process.env.OAUTH_TOKEN })

// Enable CORS for the client app
app.use(cors())

app.get('/authenticate', (req, res, next) => { // eslint-disable-line no-unused-vars
  // TODO get token
  const options = {
    method: 'POST',
    body: `code=${req.code}`,
  }

  fetch('https://github.com/login/oauth/access_token/', options)
    .then(response => response.json())
    .then(json => console.log(json)) // eslint-disable-line no-console
})

app.get('/users/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.user(req.params.username)
    .then(user => res.send(user))
    .catch(next)
})

app.get('/languages/:username', (req, res, next) => {
  client.userLanguages(req.params.username)
    .then(utils.getReposLanguagesStats)
    .then(stats => res.send(stats))
    .catch(next)
})

app.get('/commits/:username', (req, res, next) => {
  client.userCommits(req.params.username)
    .then(utils.getReposCommitsStats)
    .then(stats => res.send(stats))
    .catch(next)
})

app.get('/weekly_commits/:username', (req, res, next) => {
  client.lastThreeWeeksuserCommits(req.params.username)
    .then(utils.getWeeklyCommitsStats)
    .then(stats => res.send(stats))
    .catch(next)
})

// Forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err)
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`)
})
