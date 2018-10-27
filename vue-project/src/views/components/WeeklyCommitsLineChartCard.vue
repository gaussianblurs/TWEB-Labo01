<template>
  <div v-if="!loading">
    <line-chart :chart-data="dataCollection" :options="options"></line-chart>
  </div>
</template>

<script>
import axios from '../../HTTP'
import LineChart from './charts/LineChart'

export default {
  components: {
    LineChart
  },
  props: ['title', 'username'],
  data() {
    return {
      rawData: [],
      dataCollection: {
        datasets: []
      },
      options: {},
      colors: ['#2ecc71','#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e'],
      loading: true
    }
  },
  mounted() {
    this.fetchData()
    .then(() => this.fillData())
    .then(() => this.loading=false)
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
    fillData() {
      let colorIndex = 0
      this.rawData.forEach((repo, index) => {
        if(repo.commits.length > 0) {
          let data = []
          repo.commits.forEach(commit => {
            //this.dataCollection.labels.push(Object.keys(commit)[0])
            data.push({
              t: Object.keys(commit)[0],
              y: Object.values(commit)[0],
            })
          })
          this.dataCollection.datasets.push({
            label: repo.name,
            fill: false,
            backgroundColor: 'transparent',
            borderColor: this.colors[colorIndex],
            pointBackgroundColor: this.colors[colorIndex],
            data: data
          })
          colorIndex++
        }
      })
      this.options = {
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 30,
          fontFamily: 'Roboto',
          fontStyle: '300',
          fontColor: '#20313F',
          text: this.title
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
