<template>
  <div v-if="!loading">
    <pie-chart :chart-data="dataCollection" :options="options"></pie-chart>
  </div>
  <div v-else>
    <h1>LOADING</h1>
  </div>
</template>

<script>
import axios from '../../HTTP'
import PieChart from './charts/PieChart'
export default {
  components: {
    PieChart
  },
  props: ['title', 'username'],
  data () {
    return {
      rawData: [],
      dataCollection: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
        }]
      },
      options: {},
      colors: ['#2ecc71','#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e'],
      loading: true
    }
  },
  mounted () {
    this.fetchData()
    .then(() => this.fillData())
    .then(() => this.loading=false)
    .then(console.log(`TITLE: ${this.title}`))
  },
  methods: {
    fetchData() {
      let token = window.localStorage.getItem('access_token')
      return axios.get(`/languages/${this.username}?token=${token}`)
      .then((response) => {
        this.rawData = response.data
      })
      .catch(error => console.error(error))
    },
    fillData() {
      let colorIndex = 0
      this.rawData.forEach((language, index) => {
        this.dataCollection.labels.push(Object.keys(language)[0])
        this.dataCollection.datasets[0].data.push(Object.values(language)[0])
        this.dataCollection.datasets[0].backgroundColor.push(this.colors[index])
      }),
      this.options = {
        maintainAspectRatio: true,
        title: {
          display: true,
          fontSize: 30,
          fontFamily: 'Roboto',
          fontStyle: '300',
          fontColor: '#20313F',
          text: this.title,
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
