<template>
  <div>
    <div class="text-center">
      <b-button
      class="login-button"
      variant="outline-dark" 
      href="https://github.com/login/oauth/authorize?scope=user%20repo&client_id=404158819bf74ed09ba6">
        <span class="logo-github">
          <font-awesome-icon :icon="['fab', 'github']" />
        </span>
        <span class="text-login">Login with GitHub</span>
      </b-button>
      <p>Authenticate to get sweet GitHub stats.</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/form.scss';
</style>
