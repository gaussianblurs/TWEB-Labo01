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
      colors: ['#2ecc71', '#f1c40f', '#3498db', '#9b59b6', '#1abc9c', '#e67e22', '#e74c3c', '#34495e'],
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
      this.rawData.forEach((repo) => {
        if(repo.commits.length > 0) {
          let data = []
          repo.commits.forEach(commit => {
            data.push({
              t: Object.keys(commit)[0],
              y: Object.values(commit)[0],
            })
          })
          this.dataCollection.datasets.push({
            label: repo.name,
            fill: false,
            backgroundColor: 'transparent',
            borderColor: this.colors[colorIndex % this.colors.length],
            pointBackgroundColor: this.colors[colorIndex % this.colors.length],
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
            left: 0,
            right: 20,
            top: 5,
            bottom: 20,
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
    },
    arrayUnique(array) {
      var a = array.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }
      return a;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
