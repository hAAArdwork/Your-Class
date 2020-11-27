import router from "@/router";
import axios from "axios";

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
    console.log(error);
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

const state = {};

const mutations = {
  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  }
};

const actions = {
  createAssignment: (nothing, assignmentData) => {
    axios
      .post("assignment/create", assignmentData, {
        // File 객체가 포함된 FormData를 전송하기 위한 Option 설정
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        confirm(
          "과제 등록이 완료되었습니다. '확인'을 누르시면 이전 화면으로 돌아갑니다."
        );

        // 과제 목록 화면으로 돌아간다.
        router.go(-1);
      })
      .catch(({ response }) => {
        console.log(response);

        // 경고 문구 출력
        alert(
          `[${response.status}] 과제 등록에 실패했습니다. 다시 시도해주세요.`
        );
      });
  }
};

const getters = {};

export default {
  // Vuex 저장소 네임스페이스 사용
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
