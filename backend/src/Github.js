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

  static nextPage(linkHeader) {
    if (!linkHeader) {
      return null
    }
    const headersArr = [].concat(...linkHeader.split(',').map(el => el.split(';'))).map(el => el.trim())
    const indexOfRelNext = headersArr.findIndex(el => el === 'rel="next"')
    if (indexOfRelNext === -1) {
      return null
    }
    let nextUrl = headersArr[indexOfRelNext - 1]
    nextUrl = nextUrl.substring(this.baseUrl.length, nextUrl.length - 1)
    return nextUrl
  }

  request(token, path, opts = {}) {
    const url = `${this.baseUrl}${path}`
    const options = {
      ...opts,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
        ...opts.headers,
      },
    }

    const acc = []
    return fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new ResponseError(res, res.json())
        }
        return res
      })
      .then(res => res.json()
        .then(body => {
          acc.push(body)
          const nextPage = this.constructor.nextPage(res.headers.get('link'))
          if (nextPage) {
            return this.request(token, nextPage, options)
          }
          return [].concat(...acc)
        }))
  }

  user(token) {
    return this.request(token, '/user')
  }

  users(token, username) {
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

  repoUserCommitsSince(token, username, repoName, stringDate) {
    return this.request(token, `/repos/${repoName}/commits?page=1&per_page=100since=${stringDate}&author=${username}`)
  }

  userLanguages(token) {
    return this.reposUser(token)
      .then((repos) => {
        const getLanguages = repo => this.repoLanguages(token, repo.full_name)
        return Promise.all(repos.map(getLanguages))
      })
  }

  lastThreeWeeksUserCommits(token, username) {
    const d = new Date()
    d.setDate(d.getDate() - 21)
    return this.reposUser(token)
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
