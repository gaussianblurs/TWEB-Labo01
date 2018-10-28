<template>
  <div v-if="!loading">
    <line-chart :chart-data="dataCollection" :options="options"></line-chart>
  </div>
  <div v-else>
    <h1>LOADING</h1>
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
      return axios.get(`/commits/${this.username}/${this.reponame}?token=${token}`)
        .then((response) => {
          this.rawData = response.data
        })
        .catch(error => console.error(error))
    },
    fillData() {
      this.dataCollection.datasets.push({
        label: this.reponame,
        data: this.rawData.map((el, index) => ({
          t: Object.keys(el)[0],
          y: Object.values(el)[0],
        })),
        borderColor: this.colors[0].color,
        backgroundColor: this.colors[0].backgroundColor,
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
      },
    },
    clearData() {
      return new Promise()
        .then(() => {
          this.dataCollection = {
            datasets: []
          }
        })
    },
  },
  watch: {
    reponame: function() {
      this.loading = true
      this.clearData()
      .then(this.fetchData())
      .then(this.fillData())
      .then(this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
