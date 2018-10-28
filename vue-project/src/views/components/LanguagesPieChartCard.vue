<template>
  <b-card :title="title"
    style="max-width: 20rem;"
    class="mb-2">
    <pie-chart v-if="!loading" :chart-data="dataCollection"></pie-chart>
  </b-card>
</template>

<script>
import axios from '../../HTTP'
import PieChart from './charts/PieChart'
export default {
  components: {
    PieChart
  },
  props: ['title'],
  data () {
    return {
      rawData: [],
      dataCollection: {
        labels: [],
        datasets: [{
          label: "Languages",
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
      })
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
