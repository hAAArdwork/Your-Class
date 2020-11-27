// import axios from "axios";
// import router from "@/router";
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

const state = {
  assignmentList: new Array(),
};

const mutations = {
  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  },
  fetchAssignmentList(state, assignmentList) {
    state.assignmentList = assignmentList;
  }
};

const actions = {
  //과제 리스트
  retrieveAssignmentList: ({ commit }, classId) => {
    axios
      .get(`assignment/list/${classId}`)
      .then(({ data }) => {
        console.log(data);
        let assignmentList = new Array();
        for (let item of data) {

          console.log(item);
          const assignmentInfo = item;
          assignmentInfo.assignmentDueDate = assignmentInfo.assignmentDueDate.substring(0,10) + ' ' + assignmentInfo.assignmentDueDate.substring(11,16);
          assignmentInfo.assignmentUpdateDate = assignmentInfo.assignmentUpdateDate.substring(0,10) + ' ' + assignmentInfo.assignmentDueDate.substring(11,16);
          assignmentList.push(assignmentInfo);
        }
        commit("fetchAssignmentList", assignmentList);
      })
      .catch(() => {});
  },

};

const getters = {
  assignmentList(state) {
    return state.assignmentList;
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
