<template>
  <div class="">
    <b-navbar class="navbar-custom" type="dark" variant="info">
      <b-navbar-brand href="#" class="mx-auto">NavBar</b-navbar-brand>
    </b-navbar>

    <b-container>
      <b-card-group
        deck
        class="my-4">
        <weekly-commits-line-chart-card class="my-4" title="Overview" username="gaussianblurs"></weekly-commits-line-chart-card>
      </b-card-group>
      <b-card-group
        deck
        class="my-4">
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import WeeklyCommitsLineChartCard from "./components/WeeklyCommitsLineChartCard"
export default {
  name: 'stats',
  components: {
    WeeklyCommitsLineChartCard,
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
