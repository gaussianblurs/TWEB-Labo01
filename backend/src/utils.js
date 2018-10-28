const util = require('util')

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
  return Object.keys(stats)
    .sort((a, b) => stats[a] - stats[b])
    .map(key => ({ [key]: stats[key] }))
}

function getWeeklyCommitsStats(reposWeeklyCommits = []) {
  const stats = []
  const countCommits = o => {
    stats.push({
      name: o.repoName,
      commits: {},
    })
    o.commits.forEach(commit => {
      let { date } = commit.commit.author
      date = date.substring(0, date.indexOf('T'))
      const current = stats[stats.length - 1].commits[date] || 0
      stats[stats.length - 1].commits[date] = current + 1
    })
  }
  reposWeeklyCommits.forEach(countCommits)
  return stats.map(el => (
    {
      name: el.name,
      commits: Object.keys(el.commits)
        .sort((a, b) => new Date(a) - new Date(b))
        .map(key => ({ [key]: el.commits[key] })),
    }
  ))
}

module.exports = {
  getReposLanguagesStats,
  getWeeklyCommitsStats,
}
