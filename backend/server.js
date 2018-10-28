// loads environment variables
require('dotenv/config')
const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')
const Github = require('./src/Github')
const utils = require('./src/utils')

const app = express()
const port = process.env.PORT || 3000
const client = new Github()

// Enable CORS for the client app
app.use(cors())

app.get('/authenticate', (req, res, next) => { // eslint-disable-line no-unused-vars
  const options = {
    method: 'POST',
    headers: { Accept: 'application/json' },
  }
  const url = new URL('https://github.com/login/oauth/access_token/')
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code,
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  fetch(url, options)
    .then(response => response.json())
    .then(body => res.send(body))
})

app.get('/user', (req, res, next) => {
  client.user(req.query.token)
    .then(user => res.send(user))
    .catch(next)
})

app.get('/repos', (req, res, next) => {
  client.reposUser(req.query.token)
    .then(repos => res.send(repos))
    .catch(next)
})

app.get('/users/:username', (req, res, next) => {
  client.users(req.query.token, req.params.username)
    .then(user => res.send(user))
    .catch(next)
})

app.get('/languages/:username', (req, res, next) => {
  client.userLanguages(req.query.token, req.params.username)
    .then(utils.getReposLanguagesStats)
    .then(utils.mostPopularsLanguages)
    .then(stats => res.send(stats))
    .catch(next)
})

app.get('/commits/:username', (req, res, next) => {
  client.userCommits(req.query.token, req.params.username)
    .then(utils.getReposCommitsStats)
    .then(utils.mostPopularRepos)
    .then(stats => res.send(stats))
    .catch(next)
})


app.get('/commits/:owner/:repo', (req, res, next) => {
  client.repoCommits(req.query.token, `${req.params.owner}/${req.params.repo}`)
    .then(utils.getRepoCommitsStats)
    .then(stats => res.send(stats))
    .catch(next)
})

app.get('/weekly_commits/:username', (req, res, next) => {
  client.lastThreeWeeksUserCommits(req.query.token, req.params.username)
    .then(utils.getWeeklyCommitsStats)
    .then(stats => res.send(stats))
    .catch(next)
})

app.get('/topics/:owner/:repo', (req, res, next) => {
  client.repoTopics(req.query.token, `${req.params.owner}/${req.params.repo}`)
    .then(result => res.send(result))
    .catch(next)
})

app.get('')

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
