<template>
  <div>
    <b-navbar type="dark" variant="info">
      <a class="mx-auto"><img class="nav-logo" src="../assets/nav-logo.svg"></a>
    </b-navbar>
    <b-container>
      <b-row class="title" align-h="between">
        <b-col cols="auto" class="mr-auto">
          <b-img rounded="circle" width="75" height="75" alt="img" class="my-3 mr-3 d-inline" :src="avatar" />
          <h1 class="d-inline">{{ username }}</h1>
        </b-col>
        <b-col cols="auto">
          <div class="user-infos d-inline-block">
            <h2>{{ public_repos }} PUBLIC REPOS</h2>
            <h2>{{ private_repos }} PRIVATE REPOS</h2>
          </div>
          <div class="user-infos d-inline-block ml-4">
            <h2>{{ followers }} FOLLOWERS</h2>
            <h2>{{ collaborators }} COLLABORATORS</h2>
          </div>
        </b-col>
      </b-row>
      <b-row class="chart-container" v-if="!loading">
        <b-col>
          <weekly-commits-line-chart-card  title="3 WEEKS COMMITS" :username="username" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from '../HTTP'
import WeeklyCommitsLineChartCard from "./components/WeeklyCommitsLineChartCard"

export default {
  components: {
    WeeklyCommitsLineChartCard
  },
  data() {
    return {
      username: '',
      avatar: '',
      public_repos: '',
      private_repos: '',
      collaborators: '',
      followers: '',
      repos: [],
      loading: true,
    }
  },
  methods: {
    fetchUser() {
      let token = window.localStorage.getItem('access_token')
      return axios.get(`/user?token=${token}`)
      .then((response) => {
        this.username = response.data.login
        this.avatar = response.data.avatar_url
        this.public_repos = response.data.public_repos
        this.private_repos = response.data.total_private_repos
        this.collaborators = response.data.collaborators
        this.followers = response.data.followers
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'homepage' })
      })
    },
    fetchRepos() {
      let token = window.localStorage.getItem('access_token')
      return axios.get(`/repos?token=${token}`)
      .then((response) => {
        console.log(response.data)
        this.repos = response.data.repos
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'homepage' })
      })
    }
  },
  mounted() {
    this.fetchUser()
    .then(() => this.fetchRepos())
    .then(() => this.loading = false)
  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/statspage.scss';
</style>
