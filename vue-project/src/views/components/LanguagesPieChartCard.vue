<template>
  <b-card :title="title"
    style="max-width: 20rem;"
    class="mb-2">
    <pie-chart :chart-data="datacollection"></pie-chart>
  </b-card>
</template>

<script>
import PieChart from './charts/PieChart'
export default {
  components: {
    PieChart
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
