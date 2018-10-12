<template>
  <div class="form-container">
    <b-form-group
      description="Enter a GitHub URL to get sweet stats."
      label="Repository URL"
      label-for="input"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="null"
    >
    <b-form-input id="input" :state="state" v-model.trim="url"></b-form-input>
  </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    state () {
      if(this.url.length == 0) {
        return null
      } else {
        var re = /((https:\/\/github\.com\/)|(git@github\.com:))([\w\.@\:\/\-~]+)(\.git)/
        var valid = re.test(this.url)
        return valid
      }
    },
    invalidFeedback () {
      return this.state === false ? 'Not a valid url !' : ''
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
