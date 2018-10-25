<template>
  <b-card :title="title" class="mb-2">
    <line-chart :chart-data="dataCollection" :options="options"></line-chart>
  </b-card>
</template>

<script>
import axios from '../../HTTP'
import LineChart from './charts/LineChart'

export default {
  components: {
    LineChart
  },
  props: ['title', 'username'],
  data () {
    return {
      rawData: null,
      dataCollection: null,
      options: null
    }
  },
  mounted () {
    this.fetchData()
    .then(() => this.fillData())
  },
  methods: {
    fetchData () {
      return axios.get(`/weekly_commits/${this.username}`)
      .then((response) => {
        this.rawData = response.data
        console.log(this.rawData)
      })
      .catch(error => console.error(error))
    },
    fillData () {
      this.dataCollection = {
        datasets: [
          {
            label: "Total commits",
            data: []
          }
        ],
      }
      this.rawData.forEach(commit => {
        this.dataCollection.datasets[0].data.push({
          t: Object.keys(commit)[0],
          y: Object.values(commit)[0],
        })
      })
      this.options = {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'week'
            }
          }]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
