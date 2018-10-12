<template>
  <div class="">
    <b-navbar class="navbar-custom" type="dark" variant="info">
      <b-navbar-brand href="#" class="mx-auto">NavBar</b-navbar-brand>
    </b-navbar>

    <b-container>
      <b-card-group
        deck
        class="my-4">
        <b-card title="Card Title"
          style="max-width: 20rem;"
          class="mb-2">
          <ChartCard></ChartCard>
        </b-card>
        <b-card title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
        <b-card title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import ChartCard from "./components/ChartCard";
export default {
  name: 'stats',
  components: {
    ChartCard
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/stats.scss';
</style>
