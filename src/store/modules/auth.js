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
  logout() {
    // Vuex 저장소를 초기화한다.
    location.reload();
  },

  fetchNewToken(state, payload) {
    state.accessToken = payload.accessToken;
    state.accessTokenExpires = payload.accessTokenExpires;
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
        const tokenData = {
          accessToken: data.access,
          refreshToken: data.refresh,
          accessTokenExpires: accessTokenExpires.toString(),
          refreshTokenExpires: refreshTokenExpires.toString()
        };

        // 토큰 데이터를 Vuex State에 저장한다.
        commit("login", tokenData);
        // Loading Flag를 false로 설정한다.
        commit("fetchLoading", false);

        localStorage.setItem("accessToken", tokenData.accessToken);
        localStorage.setItem("refreshToken", tokenData.refreshToken);
        localStorage.setItem(
          "accessTokenExpires",
          tokenData.accessTokenExpires
        );
        localStorage.setItem(
          "refreshTokenExpires",
          tokenData.refreshTokenExpires
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
  },

  // localStorage에 저장된 토큰 정보를 기반으로, 새로고침 시 자동 로그인을 실시한다.
  async autoLogin({ commit, dispatch }) {
    // localStorage로부터 토큰 정보를 가져온다.
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const accessExpires = localStorage.getItem("accessTokenExpires");
    const refreshExpires = localStorage.getItem("refreshTokenExpires");

    // 토큰이 존재하지 않는 경우, 메소드를 종료한다.
    if (!accessToken && !refreshToken) {
      console.log("토큰이 존재하지 않습니다. 로그인 해주세요.");
      return;
    }

    // 두 토큰의 만료기간까지 남은 시간을 계산한다.
    const accessTimeLeft = new Date(accessExpires) - new Date();
    const refreshTimeLeft = new Date(refreshExpires) - new Date();

    // 두 토큰의 만료 시간을 토대로, 토큰이 갱신(refresh) 가능한지 검토한다.
    // true: 토큰 갱신 가능, false: 토큰 갱신 불가능, null: 토큰 갱신 불필요.
    const flag = isRefreshable(accessTimeLeft, refreshTimeLeft);

    // 토큰 갱신이 불가능한 경우,
    if (flag == false) {
      // 로그아웃을 실시한다.
      await dispatch("logout");

      alert("로그인 유효 시간이 만료되었습니다. 다시 로그인해주세요.");

      return;
    }

    const tokenData = {
      accessToken,
      refreshToken,
      accessExpires,
      refreshExpires
    };

    // 토큰 갱신이 불필요한 경우,
    if (flag == null) {
      await commit("login", tokenData);

      console.log("토큰 재발급 없이 자동 로그인 완료!");

      return;
    }

    // 토큰 갱신이 필요하고, 가능한 경우,
    axios
      // 서버 측으로 HTTP POST 요청을 통해 새로운 AccessToken 발급
      .post("user/refresh", {
        refresh: refreshToken
      })
      .then(({ data }) => {
        const newAccessToken = data.access;
        const newAccessTokenExpires = new Date(data.access_expiration_date);

        // 인증 정보를 업데이트한다.
        tokenData.accessToken = newAccessToken;
        tokenData.accessTokenExpires = newAccessTokenExpires.toString();

        localStorage.setItem("accessToken", tokenData.accessToken);
        localStorage.setItem(
          "accessTokenExpires",
          tokenData.accessTokenExpires
        );

        // 갱신된 인증 정보를 State에 반영한다.
        commit("login", tokenData);

        console.log("accessToken 재발급 후 자동 로그인 완료!");
      })
      .catch(error => {
        console.log("Failed", error.response.data);

        alert("토큰 갱신에 실패했습니다. 다시 로그인해주세요.");

        dispatch("logout");
      });
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

const isRefreshable = (accessTimeLeft, refreshTimeLeft) => {
  if (accessTimeLeft < 0 && refreshTimeLeft > 0) {
    return true;
  } else if (refreshTimeLeft < 0) {
    return false;
  } else {
    return null;
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
