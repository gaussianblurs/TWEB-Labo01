<template>
  <div v-if="!loading">
    <line-chart :chart-data="dataCollection" :options="options"></line-chart>
  </div>
</template>

<script>
import axios from '../../HTTP'
import LineChart from './charts/LineChart'
import Colors from '../../assets/data/colors.json';

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
      colors: Colors,
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
      this.rawData.forEach((repo, index) => {
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
            backgroundColor: this.colors[index].backgroundColor,
            borderColor: this.colors[index].color,
            pointBackgroundColor: this.colors[index].color,
            data: data
          })
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
