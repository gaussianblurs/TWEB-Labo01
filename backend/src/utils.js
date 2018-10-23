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

function getReposCommitsStats(userReposCommits = {}) {
  const stats = {
    username: userReposCommits.username,
    reposCommits: [],
  }
  const countCommitsForUser = o => {
    const userCommits = o.commits.reduce((acc, value) => {
      if (value.author && value.author.login !== userReposCommits.username) {
        return acc
      }
      return [...acc, value]
    }, [])
    stats.reposCommits.push({
      repoName: o.repoName,
      userCommits,
    })
  }
  userReposCommits.repoCommits.forEach(countCommitsForUser)
  return stats
}

module.exports = {
  getReposLanguagesStats,
  getReposCommitsStats,
}
