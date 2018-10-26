<template>
  <b-container fluid class="main-container">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.svg">
      </div>
      <Form :code='this.$route.query.code'></Form>
    </div>
  </b-container>
</template>

<script>
import Form from "./components/Form";
export default {
  name: "callback",
  components: {
    Form
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/homepage.scss';
</style>
