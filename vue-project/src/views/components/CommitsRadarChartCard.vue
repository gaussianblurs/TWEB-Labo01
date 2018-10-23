<template>
  <b-card :title="title" class="mb-2">
    <radar-chart :chart-data="dataCollection"></radar-chart>
  </b-card>
</template>

<script>
import axios from '../../HTTP'
import RadarChart from './RadarChart.js'

export default {
  components: {
    RadarChart
  },
  props: ['title', 'username'],
  data () {
    return {
      rawData: null,
      dataCollection: null
    }
  },
  mounted () {
    this.fetchData()
    .then(() => this.fillData())
  },
  methods: {
    fetchData () {
      return axios.get(`/commits/${this.username}`)
      .then((response) => {
        this.rawData = response.data
      })
      .catch(error => console.error(error))
    },
    fillData () {
      let labels = []
      let data = []
      for(let i = 0; i < this.rawData.reposCommits.length; i++) {
        let repoCommit = this.rawData.reposCommits[i]
        labels.push(repoCommit.repoName)
        data.push(repoCommit.userCommits.length)
      }
      this.dataCollection = {
        labels,
        datasets: [
          {
            label: "commits",
            data
          }
        ]
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
