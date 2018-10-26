<template>
  <div>
    <div class="form-container">
      <b-form-group
        description="Enter a GitHub username to get sweet stats."
        label="GitHub username"
        label-for="input"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="null"
      >
        <b-form-input
          id="input"
          placeholder=""
          :state="state"
          @keydown.native="routeToStats"
          v-model.trim="fieldUsername"
        />
    </b-form-group>
  </div>
  </div>
</template>

<script>
import axios from '../../HTTP'

export default {
  props: ['code'],
  methods: {
    routeToStats(event) {
      if (event.which === 13 && this.fieldUsername) {
        this.$router.push({ name: 'stats', params: { username: this.fieldUsername }})
      }
    },
    fetchToken() {
      return axios.get(`/authenticate/?code=${this.code}`)
      .then((response) => {
        if(response.data.access_token) {
          window.localStorage.setItem('access_token', response.data.access_token)
        } else {
          this.$router.push({ name: 'homepage' })
        }
      })
      .catch(error => console.error(error))
    }
  },
  mounted () {
    this.fetchToken()
  },
  computed: {
    state () {
      if(this.fieldUsername.length == 0) {
        return null
      } else {
        return this.code ? true : false
      }
    },
    invalidFeedback () {
      return this.state === false ? 'You must login first !' : ''
    },
    validFeedback () {
      return this.state === true ? 'Looks good !' : ''
    }
  },
  data () {
    return {
      fieldUsername: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/form.scss';
</style>
