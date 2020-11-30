import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

// baseURL 기본값을 정의한다
axios.defaults.baseURL =
  "http://ec2-13-124-222-126.ap-northeast-2.compute.amazonaws.com:8000/api/";

// HTTP Request 인터셉터
axios.interceptors.request.use(
  function(config) {
    const accessToken = localStorage.getItem("accessToken");

    // localStorage에 accessToken이 존재하면, HTTP Request Header에 추가한다.
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function(error) {
    // console.log(error);
    return Promise.reject(error);
  }
);

// HTTP Response 인터셉터
axios.interceptors.response.use(
  function(response) {
    // console.log(response);
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function(error) {
    console.log(error);
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
