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
      .then((res) => {
        if (!res.ok) {
          throw new ResponseError(res, res.json())
        }
        return res
      })
  }

  user(token, username) {
    return this.request(token, `/users/${username}`)
  }

  reposUser(token) {
    return this.request(token, '/user/repos')
  }

  repoLanguages(token, repoName) {
    return this.request(token, `/repos/${repoName}/languages`)
  }

  repoUserCommits(token, username, repoName) {
    return this.request(token, `/repos/${repoName}/commits`)
  }

  repoUserCommitsSince(token, username, repoName, stringDate, acc = [], page = 1) {
    return this.request(token, `/repos/${repoName}/commits?page=${page}&per_page=100&since=${stringDate}&author=${username}`)
      .then(res => res.json()
        .then(body => {
          acc.push(body)
          const linkHeader = res.headers.get('link')
          if (linkHeader) {
            const headersArr = [].concat(...linkHeader.split(',').map(el => el.split(';'))).map(el => el.trim())
            if (headersArr.findIndex(el => el === 'rel="next"') !== -1) {
              return this.repoUserCommitsSince(token, username, repoName, stringDate, acc, page + 1)
            }
          }
          return [].concat(...acc)
        }))
  }

  userLanguages(token) {
    return this.reposUser(token)
      .then(res => res.json())
      .then((repos) => {
        const getLanguages = repo => this.repoLanguages(token, repo.full_name)
        return Promise.all(repos.map(getLanguages))
      })
  }

  lastThreeWeeksUserCommits(token, username) {
    const d = new Date()
    d.setDate(d.getDate() - 21)
    return this.reposUser(token)
      .then(res => res.json())
      .then((repos) => {
        const getCommits = async repo => ({
          repoName: repo.full_name,
          commits: await this.repoUserCommitsSince(token, username, repo.full_name, d.toISOString())
            .catch(err => []), // eslint-disable-line no-unused-vars
        })
        return Promise.all(repos.map(getCommits))
      })
  }
}

module.exports = Github
