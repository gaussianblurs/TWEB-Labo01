<template>
  <div v-if="!loading" class="chart">
    <line-chart :chart-data="dataCollection" :options="options"></line-chart>
  </div>
  <div v-else class="loading-spinner">
    <clip-loader :loading="loading" :color="'#2ecc71'" :size="'50px'"></clip-loader>
  </div>
</template>

<script>
import axios from '../../HTTP'
import LineChart from './charts/LineChart'
import Colors from '../../assets/data/colors.json';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    LineChart,
    ClipLoader
  },
  props: ['title', 'username', 'reponame'],
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
      return axios.get(`/commits/${this.reponame}?token=${token}`)
        .then((response) => {
          this.rawData = response.data
        })
        .catch(error => console.error(error))
    },
    fillData() {
      this.dataCollection.datasets = []
      this.rawData.forEach((el, index) => {
        this.dataCollection.datasets.push({
          label: el.author,
          data: el.commits.map(commit => ({
            t: Object.keys(commit)[0],
            y: Object.values(commit)[0],
          })),
          borderColor: this.colors[index].color,
          backgroundColor: this.colors[index].backgroundColor,
        })
      })
      console.log('data loaded')
      console.log(this.dataCollection.datasets[0])
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
  },
  watch: {
    reponame: function() {
      this.loading = true
      this.fetchData()
      .then(() => this.fillData())
      .then(() => this.loading=false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/chart.scss';
</style>
