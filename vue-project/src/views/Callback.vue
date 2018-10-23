<template>
  <b-container fluid class="main-container">
    <div class="wrapper justify-content-center">
      <!-- <div class="logo">
        <img src="../assets/githubdoctor.svg">
      </div> -->
      <RepoForm :auth='true'></RepoForm>
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
