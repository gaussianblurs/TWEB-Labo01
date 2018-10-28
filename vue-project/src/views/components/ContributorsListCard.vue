<template>
  <div v-if="!loading">
    <ul>
      <li v-for="el in data"><a :href="el.link">{{ el.username }}</a> / {{ el.totalCommits }}</li>
    </ul>
  </div>
  <div v-else class="loading-spinner">
    <clip-loader :loading="loading" :color="'#2ecc71'" :size="'50px'"></clip-loader>
  </div>
</template>

<script>
import axios from '../../HTTP'
import Colors from '../../assets/data/colors.json';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    ClipLoader
  },
  props: ['title', 'reponame'],
  data() {
    return {
      data: [],
      colors: Colors,
      loading: true,
    }
  },
  mounted() {
    this.fetchData()
    .then(() => this.loading=false)
  },
  methods: {
    fetchData () {
      let token = window.localStorage.getItem('access_token')
      return axios.get(`/contributors/${this.reponame}?token=${token}`)
        .then((response) => {
          this.data = response.data
        })
        .catch(error => console.error(error))
    },
  },
  watch: {
    reponame: function() {
      this.loading = true
      this.fetchData()
      .then(() => this.loading=false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/chart.scss';
</style>
