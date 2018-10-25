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
  return Object.keys(stats)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(key => ({ [key]: stats[key] }))
}

module.exports = {
  getReposLanguagesStats,
  getWeeklyCommitsStats,
}
