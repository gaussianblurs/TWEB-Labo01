<template>
  <b-card :title="title"
    style="max-width: 20rem;"
    class="mb-2">
    <radar-chart :chart-data="dataCollection"></radar-chart>
  </b-card>
</template>

<script>
import RadarChart from './RadarChart.js'
import axios from '../../HTTP'

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
    .then(this.fillData())
  },
  methods: {
    fetchData () {
      return axios.get(`/commits/${this.username}`)
      .then((response) => {
        this.rawData = response
        console.log(`fetchData(): this.rawData: ${this.rawData}`)
      })
      .catch(error => console.error(error))
    },
    fillData () {
      console.log(`fillData(): this.rawData: ${this.rawData}`)
      let labels = []
      let datasets = []
      for(let i = 0; i < this.rawData.reposCommits.length; i++) {
        let repoCommit = this.rawData.reposCommits[i]
        labels.push(repoCommit.repoName)
        datasets.push(repoCommit.userCommits)
      }
      this.dataCollection = {
        labels,
        datasets
      }
      console.log(`fillData(): datacollection: ${this.dataCollection}`)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
