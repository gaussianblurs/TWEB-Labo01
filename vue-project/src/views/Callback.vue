<template>
  <b-container fluid class="main-container">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.svg">
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from '../HTTP'

export default {
  name: "callback",
  components: {
  },
  methods: {
    routeToStats(event) {
      if (event.which === 13 && this.fieldUsername) {
        this.$router.push({ name: 'stats', params: { username: this.fieldUsername }})
      }
    },
    fetchToken() {
      return axios.get(`/authenticate?code=${this.code}`)
      .then((response) => {
        console.log(response)
        if(!response.data.access_token && !window.localStorage.getItem('access_token')) {
          this.$router.push({ name: 'homepage' })
        } else {
          console.log(response.data.access_token)
          window.localStorage.setItem('access_token', response.data.access_token)
        }
      })
      .catch(error => console.error(error))
    },
    fetchUsername() {
      let token = window.localStorage.getItem('access_token')
      return axios.get(`/user?token=${token}`)
      .then((response) => {
        console.log(response)
        if(response.data.login) {
          this.$router.push({ name: 'stats', params: { username: this.login }})
        } else {
          this.$router.push({ name: 'homepage' })
        }
      })
      .catch(error => console.error(error))
    }
  },
  mounted () {
    this.code=this.$route.query.code
    this.fetchToken()
    .then(() => this.fetchUsername())
  },
  data () {
    return {
      code: '',
      username: '',
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/homepage.scss';
</style>
