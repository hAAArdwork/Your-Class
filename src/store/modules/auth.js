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

  // 유저 프로필 정보
  userData: null,

  // 에러 관련
  loginErrorMsg: null,

  // 로딩 관련
  isAuthLoading: false
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
  }
};

const actions = {
  login({ commit }, payload) {
    authInstance
      .post(`user/login`, payload)
      .then(response => {
        console.log(response);
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

        // mutation 실행
        commit("login", authData);

        localStorage.setItem("accessToken", authData.accessToken);
        localStorage.setItem("refreshToken", authData.refreshToken);
        localStorage.setItem("accessTokenExpires", authData.accessTokenExpires);
        localStorage.setItem(
          "refreshTokenExpires",
          authData.refreshTokenExpires
        );

        router.replace("/main"); // 로그인 성공 시, 홈 페이지로 리디렉트한다.
      })
      .catch(error => {
        // 로그인 오류 시, 서버로부터 반환된 에러 데이터를 가져온다.
        const res = error.response;
        console.log(res);

        const notActive = "No active account found with the given credentials";

        // Bad Request (400) 에러 처리
        if (res.status == 400) {
          alert("HTTP 400 - 잘못된 요청입니다.");
        }
        // Unauthorized (401) 에러 처리
        if (res.status == 401) {
          if (res.data.detail === notActive) {
            alert("가입 시 입력한 이메일로 전송된 인증 메일을 확인해주세요.");
          } else {
            alert("이메일 또는 비밀번호를 다시 확인해주세요.");
          }
        }
        // Not Found(404) 에러 처리
        else if (res.status == 404) {
          alert("HTTP 404 - 연결이 원활하지 못합니다. 잠시 후 시도해주세요.");
        }
      });
  },

  logout({ commit }) {
    // State에서 유저관련 정보를 모두 지운다.
    commit("logout");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpires");
    localStorage.removeItem("refreshTokenExpires");
  }
};

const getters = {
  // 로그인 여부 반환
  isLoggedIn(state) {
    return state.accessToken !== null;
  },
  getAccessToken(state) {
    return state.accessToken;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
