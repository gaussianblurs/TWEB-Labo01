<template>
  <div>
    <b-navbar type="dark" variant="info">
      <a><img class="nav-logo" src="../assets/nav-logo.svg"></a>
      <b-nav-form>
        <b-form-group>
          <b-form-input
            class="mr-sm-2"
            id="input"
            placeholder="username"
            @submit.prevent
            v-model.trim="fieldUsername"
          />
        </b-form-group>
      </b-nav-form>
    </b-navbar>
    <b-container>
      <div class="chart-container">
<<<<<<< HEAD
        <weekly-commits-line-chart-card class="my-4" title="Overview" :username="username"></weekly-commits-line-chart-card>
=======
        <weekly-commits-line-chart-card class="my-4" title="Overview" username="gaussianblurs"></weekly-commits-line-chart-card>
>>>>>>> df0e5376171238df7223c5e52b1054a9571c5f6e
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
      event.preventDefault()
      if (event.which === 13 && this.fieldUsername) {
        this.$router.push({ name: 'stats', params: { username: this.fieldUsername }})
      }
    },
  },
  mounted() {
    console.log(this.username)
  },
  data() {
    return {
      fieldUsername: '',
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/statspage.scss';
</style>
