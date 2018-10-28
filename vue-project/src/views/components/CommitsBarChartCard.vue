<template>
  <div v-if="!loading">
    <bar-chart :chart-data="dataCollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import axios from '../../HTTP'
import BarChart from './charts/BarChart'

export default {
  components: {
    BarChart
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
      return axios.get(`/commits/${this.username}?token=${token}`)
      .then((response) => {
        this.rawData = response.data
      })
      .catch(error => console.error(error))
    },
    fillData() {
      let colorIndex = 0
      this.rawData.forEach((repo) => {
        this.dataCollection.datasets.push({
          label: repo.name,
          fill: true,
          backgroundColor: this.backgroundColors[colorIndex],
          borderColor: this.colors[colorIndex],
          pointBackgroundColor: this.colors[colorIndex],
          data: [repo.commits]
        })
        colorIndex++
      })
      this.options = {
        maintainAspectRatio: true,
        title: {
          display: true,
          fontSize: 30,
          fontFamily: 'Roboto',
          fontStyle: '300',
          fontColor: '#20313F',
          text: this.title
        },
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
