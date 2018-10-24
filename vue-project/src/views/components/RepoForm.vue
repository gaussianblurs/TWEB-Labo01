<template>
  <div class="form-container">
    <b-form-group
      description="Enter a GitHub username to get sweet stats."
      label="GitHub username"
      label-for="input"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="null"
    >
      <b-form-input id="input" :state="state" v-model.trim="url" placeholder="" ></b-form-input>
    </b-form-group>
    <div v-if="this.code !== null">
      <b-button class="form-button" variant="outline-primary" href="https://github.com/login/oauth/authorize?scope=user:email&client_id=404158819bf74ed09ba6">
        Login
      </b-button>
    </div>

  </div>
</template>

<script>
export default {
  props: ['code'],
  computed: {
    state () {
      if(this.username.length == 0) {
        return null
      } else {
        // var re = /((https:\/\/github\.com\/)|(git@github\.com:))([\w\.@\:\/\-~]+)(\.git)/
        // var valid = re.test(this.url)
        return this.code
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
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/repoform.scss';
</style>
