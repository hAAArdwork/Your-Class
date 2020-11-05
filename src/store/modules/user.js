import axios from "axios";
// import router from "@/router";

const userAxios = axios.create();
userAxios.defaults.baseURL = "http://127.0.0.1:8000/api/";

// HTTP Request 인터셉터
userAxios.interceptors.request.use(
  function(config) {
    console.log(config);

    const accessToken = localStorage.getItem("accessToken");

    // localStorage에 accessToken이 존재하면, HTTP Request Header에 추가한다.
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function(error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// HTTP Response 인터셉터
userAxios.interceptors.response.use(
  function(response) {
    console.log(response);
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

const studentAvatar =
  "https://www.flaticon.com/svg/static/icons/svg/1987/1987957.svg";
const teacherAvatar =
  "https://www.flaticon.com/svg/static/icons/svg/1987/1987963.svg";

const state = {
  email: null,
  name: null,
  birthday: null,
  school: null,
  isStudent: null,

  isLoading: false
};

const mutations = {
  fetchUser: (state, userData) => {
    state.email = userData.email;
    state.name = userData.name;
    state.birthday = userData.birthday;
    state.school = userData.school;
    state.isStudent = userData.isStudent;
  },
  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  }
};

const actions = {
  // 비동기 함수로 지정하여, Axios 요청이 완전히 종료된 후 함수가 종료되도록 한다.
  requestUserData: async ({ commit }) => {
    await userAxios
      .get("user/me")
      .then(({ data }) => {
        commit("fetchUser", {
          email: data.user.email,
          name: data.user.name,
          birthday: data.user.birthday,
          school: data.user.school,
          isStudent: data.user.is_student
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  },

  updatePassword({ commit }, passwordFormData) {
    // Loading Flag를 true로 바꾼다.
    commit("fetchLoading", true);

    userAxios
      // 새 비밀반호 정보를 HTTP POST로 서버에 전송한다.
      .patch("user/me/edit", {
        password: passwordFormData.password,
        password_confirm: passwordFormData.passwordConfirm
      })
      .then(() => {
        alert("비밀번호가 변경되었습니다. 다음 로그인부터 적용됩니다.");
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      })
      .finally(() => {
        // Loading Flag를 false로 바꾼다.
        commit("fetchLoading", false);
      });
  }
};

const getters = {
  userData(state) {
    return {
      email: state.email,
      name: state.name,
      birthday: state.birthday,
      school: state.school,
      isStudent: state.isStudent,
      avatarPath: state.isStudent ? studentAvatar : teacherAvatar
    };
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
