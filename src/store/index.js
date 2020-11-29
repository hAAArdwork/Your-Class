import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.js";
import user from "./modules/user.js";
import classes from "./modules/classes.js";
import assignment from "./modules/assignment.js";
import post from "./modules/post.js";
import schedule from "./modules/schedule.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  getters: {},

  modules: {
    auth,
    user,
    classes,
    assignment,
    post,
    schedule
  }
});

export default store;
