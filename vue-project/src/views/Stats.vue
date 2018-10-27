<template>
  <div>
    <b-navbar type="dark" variant="info">
      <a class="mx-auto"><img class="nav-logo" src="../assets/nav-logo.svg"></a>
    </b-navbar>
    <b-container>
      <b-row>
      <div class="chart-container d-inline">
        <weekly-commits-line-chart-card class="my-4" title="Overview" :username="currentUsername" />
      </div>
    </b-row>
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
        this.$router.push({ name: 'stats', params: { username: this.fieldUsername }})
      }
    },
    fetchToken() {
      let token = window.localStorage.getItem('access_token')
      if(!token) {
        axios.get(`/authenticate/?code=${this.code}`)
        .then((response) => {
          let token = window.localStorage.getItem('access_token');
          if(!token)
          if(response.data.access_token) {
            window.localStorage.setItem('access_token', response.data.access_token)
          } else {
            this.$router.push({ name: 'homepage' })
          }
        })
        .catch(error => console.error(error))
      }
    }
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
