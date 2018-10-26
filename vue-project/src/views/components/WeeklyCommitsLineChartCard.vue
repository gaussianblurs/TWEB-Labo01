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
        datasets: [
          {
            label: "Commits",
            backgroundColor: 'transparent',
            borderColor: '#27ae60',
            pointBackgroundColor: '#27ae60',
            // pointBorderColor: '#27ae60',
            //pointBorderWidth: 3,
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
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 30,
          text: '3 Weeks Commits'
        },
        legend: {
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
              unit: 'day'
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
