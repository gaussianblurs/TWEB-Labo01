import Vue from "vue";
import Router from "vue-router";
import Homepage from "./views/Homepage";
import Callback from "./views/Callback";
import Stats from "./views/Stats";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage,
      props: true
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback,
      props: true
    },
    {
      path: "/stats",
      name: "stats",
      component: Stats
    }
  ]
});
