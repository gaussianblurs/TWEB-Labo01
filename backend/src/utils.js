function getReposLanguagesStats(reposLanguages = []) {
  const stats = {}
  const countLanguages = o => {
    Object.keys(o).forEach(key => {
      const value = o[key]
      const current = stats[key] || 0
      stats[key] = current + value
    })
  }
  reposLanguages.forEach(countLanguages)
  return stats
}

function getReposCommitsStats(reposCommits = []) {
  const stats = []
  const countCommitsForUser = o => {
    const commits = o.commits.reduce((acc, value) => {
      if (value.author && value.author.login !== reposCommits.username) {
        return acc
      }
      return [...acc, value]
    }, [])
    stats.push({
      repoName: o.repoName,
      commits,
    })
  }
  reposCommits.forEach(countCommitsForUser)
  return stats
}

function getWeeklyCommitsStats(reposWeeklyCommits = []) {
  const stats = {}
  const countCommits = o => {
    o.commits.forEach(commit => {
      let { date } = commit.commit.author
      date = date.substring(0, date.indexOf('T'))
      const current = stats[date] || 0
      stats[date] = current + 1
    })
  }
  reposWeeklyCommits.forEach(countCommits)
  const sortedDateCommits = []
  Object.keys(stats).forEach(key => {
    sortedDateCommits.push({ [key]: stats[key] })
  })
  sortedDateCommits.sort((a, b) => {
    const date1 = Object.keys(a)[0]
    const date2 = Object.keys(b)[0]
    return new Date(date1) - new Date(date2)
  })
  return sortedDateCommits
}

module.exports = {
  getReposLanguagesStats,
  getReposCommitsStats,
  getWeeklyCommitsStats,
}
