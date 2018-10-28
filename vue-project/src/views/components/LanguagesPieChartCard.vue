<template>
  <div v-if="!loading">
    <pie-chart :chart-data="dataCollection" :options="options"></pie-chart>
  </div>
</template>

<script>
import axios from '../../HTTP'
import PieChart from './charts/PieChart'
import Colors from '../../assets/data/colors.json';

export default {
  components: {
    PieChart
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
        this.dataCollection.datasets[0].backgroundColor.push(this.colors[index].color)
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
