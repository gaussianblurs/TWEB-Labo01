import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueCharts from "vue-chartjs"
import App from './App.vue'
import router from "./router";

Vue.use(BootstrapVue)
Vue.use(VueCharts)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
