import Vue from "vue";
import Router from "vue-router";
import Homepage from "./views/Homepage";
import Stats from "./views/Stats";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage
    },
    {
      path: "/stats",
      name: "stats",
      component: Stats
    }
  ]
});
