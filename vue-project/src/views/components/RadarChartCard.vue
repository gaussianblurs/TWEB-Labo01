<template>
  <b-card :title="title"
    style="max-width: 20rem;"
    class="mb-2">
    <radar-chart :chart-data="datacollection"></radar-chart>
  </b-card>
</template>

<script>
import RadarChart from './RadarChart.js'
export default {
  components: {
    RadarChart
  },
  props: ['title'],
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
