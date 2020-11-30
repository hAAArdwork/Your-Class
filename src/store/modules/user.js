import axios from "axios";

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
    await axios
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

    axios
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
