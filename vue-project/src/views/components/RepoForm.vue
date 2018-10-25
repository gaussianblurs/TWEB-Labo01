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
      <b-form-input id="input" :state="state" v-model.trim="username" placeholder="" ></b-form-input>
    </b-form-group>
  </div>
  </div>
</template>

<script>
import axios from '../../HTTP'

export default {
  props: ['code'],
  methods: {
    fetchToken () {
      return axios.get(`/authenticate/?code=${this.code}`)
      .then((response) => {
        window.localStorage.setItem('access_token', response.data.access_token);
      })
      .catch(error => console.error(error))
    }
  },
  mounted () {
    this.fetchToken()
    .then(() => console.log('done'))
  },
  computed: {
    state () {
      if(this.username.length == 0) {
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
      username: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/repoform.scss';
</style>
