<template>
  <div v-if="!loading" class="chart">
    <pie-chart :chart-data="dataCollection" :options="options"></pie-chart>
  </div>
  <div v-else class="loading-spinner">
    <clip-loader :loading="loading" :color="'#2ecc71'" :size="'50px'"></clip-loader>
  </div>
</template>

<script>
import axios from '../../HTTP'
import PieChart from './charts/PieChart'
import Colors from '../../assets/data/colors.json';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    PieChart,
    ClipLoader
  },
  props: ['title', 'username'],
  data () {
    return {
      colors: Colors,
      rawData: [],
      dataCollection: {
        labels: [],
        datasets: [{
          data: [],
          borderColor: [],
          backgroundColor: [],
        }]
      },
      options: {},
      loading: true
    }
  },
  mounted () {
    this.fetchData()
    .then(() => this.fillData())
    .then(() => this.loading=false)
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
      this.rawData.forEach((language, index) => {
        this.dataCollection.labels.push(Object.keys(language)[0])
        this.dataCollection.datasets[0].data.push(Object.values(language)[0])
        this.dataCollection.datasets[0].borderColor.push(this.colors[index].color)
        this.dataCollection.datasets[0].backgroundColor.push(this.colors[index].backgroundColor)
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
@import '../../assets/scss/chart.scss';
</style>
