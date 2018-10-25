import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueCharts from "vue-chartjs"
import App from './App.vue'
import router from "./router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueCharts)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
