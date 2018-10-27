<template>
  <b-container fluid class="main-container">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.svg">
      </div>
      <h1>LOGGING IN...</h1>
    </div>
  </b-container>
</template>

<script>
import axios from '../HTTP'

export default {
  name: "callback",
  components: {
  },
  data () {
    return {
      code: '',
    }
  },
  methods: {
    fetchToken() {
      axios.get(`/authenticate?code=${this.code}`)
      .then((response) => {
        window.localStorage.setItem('access_token', response.data.access_token)
        this.$router.push({ name: 'stats' })
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'homepage' })
      })
    },
  },
  mounted () {
    if(!this.$route.query.code) {
      this.$router.push({ name: 'homepage' })
    } else {
      this.code=this.$route.query.code
      this.fetchToken()
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/homepage.scss';
</style>
