import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.js";
import user from "./modules/user.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  getters: {},

  modules: {
    auth,
    user
  }
});

export default store;
