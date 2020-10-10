import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    }
  },
  actions: {},
  getters: {
    loginStatus(state) {
      return state.loggedIn;
    }
  },
  modules: {}
});
