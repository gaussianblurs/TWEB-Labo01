<template>
  <div>
    <b-navbar type="dark" variant="info">
      <a href="#"><img class="nav-logo" src="../assets/nav-logo.svg"></a>
      <b-nav-form>
        <b-form-input class="mr-sm-2" type="text" placeholder="username" variant="outline-dark"/>
        <b-button class="my-2 my-sm-0" variant="outline-dark" type="submit">Search</b-button>
      </b-nav-form>
    </b-navbar>

    <b-container>
      <div class="chart-container">
        <weekly-commits-line-chart-card class="my-4" title="Overview" username="SoftEng-HEIGVD"></weekly-commits-line-chart-card>
      </div>
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
    return {}
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/statspage.scss';
</style>
