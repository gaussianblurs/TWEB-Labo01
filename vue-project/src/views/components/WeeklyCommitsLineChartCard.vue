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
      colors: [
        'rgba(46, 204, 113,1.0)',
        'rgba(241, 196, 15,1.0)',
        'rgba(52, 152, 219,1.0)',
        'rgba(231, 76, 60,1.0)',
        'rgba(155, 89, 182,1.0)',
        'rgba(52, 73, 94,1.0)',
        'rgba(230, 126, 34,1.0)',
        'rgba(26, 188, 156,1.0)'],
        backgroundColors: [
          'rgba(46, 204, 113,0.5)',
          'rgba(241, 196, 15,0.5)',
          'rgba(52, 152, 219,0.5)',
          'rgba(231, 76, 60,0.5)',
          'rgba(155, 89, 182,0.5)',
          'rgba(52, 73, 94,0.5)',
          'rgba(230, 126, 34,0.5)',
          'rgba(26, 188, 156,0.5)'],
      loading: true,
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
            fill: true,
            backgroundColor: this.backgroundColors[colorIndex],
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
