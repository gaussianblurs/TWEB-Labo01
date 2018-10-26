<template>
  <div>
    <b-navbar type="dark" variant="info">
      <a><img class="nav-logo" src="../assets/nav-logo.svg"></a>
      <b-nav-form v-on:submit.prevent="">
          <b-form-input
            class="mr-sm-2"
            id="input"
            placeholder="username"
            @keydown.native="routeToStats"
            v-model.trim="fieldUsername"
          />
      </b-nav-form>
    </b-navbar>
    <b-container>
      <div class="chart-container">
        <weekly-commits-line-chart-card class="my-4" title="Overview" :username="currentUsername" />
      </div>
    </b-container>
  </div>
</template>

<script>
import WeeklyCommitsLineChartCard from "./components/WeeklyCommitsLineChartCard"
export default {
  props: ['username'],
  components: {
    WeeklyCommitsLineChartCard
  },
  methods: {
    routeToStats(event) {
      if (event.which === 13 && this.fieldUsername) {
        this.currentUsername = this.fieldUsername
      }
    },
  },
  data() {
    return {
      fieldUsername: '',
      currentUsername: this.username,
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/statspage.scss';
</style>
