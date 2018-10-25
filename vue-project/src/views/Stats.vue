<template>
  <div class="">
    <b-navbar class="navbar-custom" type="dark" variant="info">
      <b-navbar-brand href="#" class="mx-auto">NavBar</b-navbar-brand>
    </b-navbar>

    <b-container>
      <b-card-group
        deck
        class="my-4">
        <weekly-commits-line-chart-card class="my-4" title="Weekly commits" username="gaussianblurs"></weekly-commits-line-chart-card>
      </b-card-group>
      <b-card-group
        deck
        class="my-4">
        <pie-chart-card title="Card 1"></pie-chart-card>
        <pie-chart-card title="Card 2"></pie-chart-card>
        <pie-chart-card title="Card 3"></pie-chart-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import PieChartCard from "./components/PieChartCard"
import CommitsRadarChartCard from "./components/CommitsRadarChartCard"
import WeeklyCommitsLineChartCard from "./components/WeeklyCommitsLineChartCard"
export default {
  name: 'stats',
  components: {
    WeeklyCommitsLineChartCard,
    CommitsRadarChartCard,
    PieChartCard,
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/statspage.scss';
</style>
