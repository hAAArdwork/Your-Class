import axios from "axios";
import router from "@/router";

const authInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

const state = {
  // 인증 토큰 관련
  accessToken: null,
  refreshToken: null,
  accessTokenExpires: null,
  refreshTokenExpires: null,

  isLoading: false
};

const mutations = {
  // 로그인 Mutation
  login(state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    state.accessTokenExpires = payload.accessTokenExpires;
    state.refreshTokenExpires = payload.refreshTokenExpires;
  },

  // 로그아웃 Mutation
  logout(state) {
    state.accessToken = null;
    state.refreshToken = null;
    state.accessTokenExpires = null;
    state.refreshTokenExpires = null;
  },

  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  }
};

const actions = {
  login({ commit }, payload) {
    // Loading Flag를 true로 바꾼다.
    commit("fetchLoading", true);

    authInstance
      .post(`user/login`, payload)
      .then(response => {
        const data = response.data;

        // 자바스크립트 Date 객체로 파싱
        const accessTokenExpires = new Date(data.access_expiration_date);
        const refreshTokenExpires = new Date(data.refresh_expiration_date);

        // State에 저장할 데이터
        const authData = {
          accessToken: data.access,
          refreshToken: data.refresh,
          accessTokenExpires: accessTokenExpires.toString(),
          refreshTokenExpires: refreshTokenExpires.toString()
        };

        // 토큰 데이터를 Vuex State에 저장한다.
        commit("login", authData);
        // Loading Flag를 false로 설정한다.
        commit("fetchLoading", false);

        localStorage.setItem("accessToken", authData.accessToken);
        localStorage.setItem("refreshToken", authData.refreshToken);
        localStorage.setItem("accessTokenExpires", authData.accessTokenExpires);
        localStorage.setItem(
          "refreshTokenExpires",
          authData.refreshTokenExpires
        );

        // 로그인 성공 시, 홈 페이지로 리디렉트한다.
        router.replace("/main");
      })
      .catch(error => {
        // 로그인 오류 시, 서버로부터 반환 된 에러 데이터를 가져온다.
        const errorResponse = error.response;

        // Bad Request (400) 에러 처리
        if (errorResponse.status == 400) {
          if (errorResponse.data["email"] && errorResponse.data["password"]) {
            alert("이메일, 비밀번호를 입력해주세요.");
          } else if (errorResponse.data["email"]) {
            alert("이메일을 입력해주세요.");
          } else if (errorResponse.data["password"]) {
            alert("비밀번호를 입력해주세요.");
          } else {
            alert("HTTP 400 - 잘못된 요정입니다.");
          }
        }
        // Unauthorized (401) 에러 처리
        else if (errorResponse.status == 401) {
          alert("이메일 또는 비밀번호가 옳지 않습니다. 다시 확인해주세요.");
        }
        // Not Found(404) 에러 처리
        else if (errorResponse.status == 404) {
          alert("HTTP 404 - 연결이 원활하지 못합니다. 잠시 후 시도해주세요.");
        }

        // Loading Flag를 false로 설정한다.
        commit("fetchLoading", false);
      });
  },

  logout({ commit }) {
    // Vuex State에서 토큰 정보를 모두 지운다.
    commit("logout");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpires");
    localStorage.removeItem("refreshTokenExpires");
  }
};

const getters = {
  // 로그인 여부 반환
  hasAccessToken(state) {
    return state.accessToken !== null;
  },
  // 로딩 여부 반환
  isLoading(state) {
    return state.isLoading;
  }
};

export default {
  // Vuex 저장소 네임스페이스 사용
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
