const fetch = require('node-fetch')

class ResponseError extends Error {
  constructor(res, body) {
    super(`${res.status} error requesting ${res.url}: ${res.statusText}`)
    this.status = res.status
    this.path = res.url
    this.body = body
  }
}

class Github {
  constructor(baseUrl = 'https://api.github.com') {
    this.baseUrl = baseUrl
  }

  request(token, path, opts = {}) {
    const url = `${this.baseUrl}${path}`
    const options = {
      ...opts,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
        ...opts.headers,
      },
    }

    return fetch(url, options)
      .then(res => res.json()
        .then((data) => {
          if (!res.ok) {
            throw new ResponseError(res, data)
          }
          return data
        }))
  }

  user(token, username) {
    return this.request(token, `/users/${username}`)
  }

  repos(token, username) {
    this.request(token, `/users/${username}/repos`).then((repos) => console.log(repos)) // eslint-disable-line no-console
    return this.request(token, `/users/${username}/repos`)
  }

  repoLanguages(token, repoName) {
    return this.request(token, `/repos/${repoName}/languages`)
  }

  repoUserCommits(token, username, repoName) {
    return this.request(token, `/repos/${repoName}/commits`)
  }

  repoUserCommitsSince(token, username, repoName, stringDate) {
    return this.request(token, `/repos/${repoName}/commits?since=${stringDate}&author=${username}`)
  }

  userLanguages(token, username) {
    return this.repos(token, username)
      .then((repos) => {
        const getLanguages = repo => this.repoLanguages(token, repo.full_name)
        return Promise.all(repos.map(getLanguages))
      })
  }

  lastThreeWeeksUserCommits(token, username) {
    const d = new Date()
    d.setDate(d.getDate() - 21)
    return this.repos(token, username)
      .then((repos) => {
        const getCommits = async repo => ({
          repoName: repo.full_name,
          commits:
            await this.repoUserCommitsSince(token, username, repo.full_name, d.toISOString()),
        })
        return Promise.all(repos.map(getCommits))
      })
  }
}

module.exports = Github
