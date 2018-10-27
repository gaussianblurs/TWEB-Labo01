<template>
  <line-chart :chart-data="dataCollection" :options="options"></line-chart>
</template>

<script>
import axios from '../../HTTP'
import LineChart from './charts/LineChart'

export default {
  components: {
    LineChart
  },
  props: ['title', 'username'],
  watch: {
    // whenever question changes, this function will run
    username: function () {
      this.fetchData()
      .then(() => this.fillData())
    }
  },
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
      let token = window.localStorage.getItem('access_token')
      return axios.get(`/weekly_commits/${this.username}?token=${token}`)
      .then((response) => {
        this.rawData = response.data
      })
      .catch(error => console.error(error))
    },
    fillData () {
      this.dataCollection = {
        datasets: [],
      }
      this.rawData.forEach((repo, index) => {
        const dataset = this.dataCollection.datasets[index]
        dataset.push({
          label: repo.name,
          backgroundColor: 'transparent',
          borderColor: '#27ae60',
          pointBackgroundColor: '#27ae60',
          // pointBorderColor: '#27ae60',
          //pointBorderWidth: 3,
          data: []
        })
        repo.commits.forEach(commit => {
          dataset.data.push({
            t: Object.keys(commit)[0],
            y: Object.values(commit)[0],
          })
        })
      })
      this.options = {
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 30,
          text: '3 Weeks Commits'
        },
        legend: {
          labels: {
          }
        },
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 10,
            bottom: 20
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'week'
            },
            gridLines: {
            },
          }]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
