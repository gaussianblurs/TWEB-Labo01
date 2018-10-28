<template>
  <div v-if="!loading">
    <bar-chart :chart-data="dataCollection" :options="options"></bar-chart>
  </div>
  <div v-else class="loading-spinner">
    <clip-loader :loading="loading" :color="'#2ecc71'" :size="'50px'"></clip-loader>
  </div>
</template>

<script>
import axios from '../../HTTP'
import BarChart from './charts/BarChart'
import Colors from '../../assets/data/colors.json';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    BarChart,
    ClipLoader
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
      return axios.get(`/commits/${this.username}?token=${token}`)
      .then((response) => {
        this.rawData = response.data
      })
      .catch(error => console.error(error))
    },
    fillData() {
      this.rawData.forEach((repo, index) => {
        this.dataCollection.datasets.push({
          label: repo.name,
          fill: true,
          backgroundColor: this.colors[index].backgroundColor,
          borderColor: this.colors[index].color,
          borderWidth: 2,
          pointBackgroundColor: this.colors[index].color,
          data: [repo.commits]
        })
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
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 5,
            bottom: 0,
          }
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
  @import '../../assets/scss/chart.scss';
</style>
