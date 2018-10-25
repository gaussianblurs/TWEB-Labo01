<template>
  <b-container fluid class="main-container">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.svg">
      </div>
      <Login></Login>
    </div>
  </b-container>
</template>

<script>
import Login from "./components/Login";
export default {
  name: "homepage",
  components: {
    Login
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/homepage.scss';
</style>
