<template>
  <b-container fluid class="main-container">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.svg">
      </div>
      <RepoForm :code='this.$route.query.code'></RepoForm>
    </div>
  </b-container>
</template>

<script>
import RepoForm from "./components/RepoForm";
export default {
  name: "callback",
  components: {
    RepoForm
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/homepage.scss';
</style>
