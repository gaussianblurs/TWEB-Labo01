<template>
  <div class="form-container">
    <b-form-group
      description="Enter a GitHub username to get sweet stats."
      label="Repository URL"
      label-for="input"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="null"
    >
      <b-form-input id="input" :state="state" v-model.trim="url" placeholder="" ></b-form-input>
    </b-form-group>
    <div v-if="this.auth === false">
      <b-button class="form-button" variant="outline-primary" href="https://github.com/login/oauth/authorize?scope=user:email&client_id=<%= client_id %>">
        Login
      </b-button>
    </div>

  </div>
</template>

<script>
export default {
  props: ['auth'],
  computed: {
    state () {
      if(this.url.length == 0) {
        return null
      } else {
        // var re = /((https:\/\/github\.com\/)|(git@github\.com:))([\w\.@\:\/\-~]+)(\.git)/
        // var valid = re.test(this.url)
        return this.auth
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
      url: ''
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/repoform.scss';
</style>
