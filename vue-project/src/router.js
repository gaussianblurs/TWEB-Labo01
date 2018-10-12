import Vue from "vue";
import Router from "vue-router";
import Homepage from "./views/Homepage";
import Stats from "./views/Stats";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      name: "homepage",
      component: Homepage
    },
    {
      path: "/",
      name: "stats",
      component: Stats
    }
  ]
});
