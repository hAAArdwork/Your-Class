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

const state = {
  assignmentList: new Array(),

  // 단일 과제 세부 내역
  assignmentName: "",
  assignmentDetail: "",
  assignmentDate: "",
  assignmentTime: "",
  assignmentFile: "",
  assignmentFileName: ""
};

const mutations = {
  // 과제 목록을 Vuex Store에 반영한다.
  fetchAssignmentList(state, assignmentList) {
    state.assignmentList = assignmentList;
  },

  fetchAssignmentDetail(state, assignemntData) {
    state.assignmentName = assignemntData.assignmentName;
    state.assignmentDetail = assignemntData.assignmentDetail;
    state.assignmentDate = assignemntData.assignmentDueDate.substring(0, 10);
    state.assignmentTime = assignemntData.assignmentDueDate.substring(11, 16);
    state.assignmentFile = assignemntData.assignmentFile;
    state.assignmentFileName = assignemntData.assignmentFileName;
  }
};

const actions = {
  // 과제 리스트
  retrieveAssignmentList: ({ commit }, classId) => {
    axios
      .get(`assignment/list/${classId}`)
      .then(({ data }) => {
        let assignmentList = new Array();

        for (let item of data) {
          const assignmentInfo = item;

          assignmentInfo.assignmentDueDate =
            assignmentInfo.assignmentDueDate.substring(0, 10) +
            " " +
            assignmentInfo.assignmentDueDate.substring(11, 16);

          assignmentInfo.assignmentUpdateDate =
            assignmentInfo.assignmentUpdateDate.substring(0, 10) +
            " " +
            assignmentInfo.assignmentDueDate.substring(11, 16);

          assignmentList.push(assignmentInfo);
        }

        commit("fetchAssignmentList", assignmentList);
      })
      .catch(() => {});
  },

  // 과제 생성
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
  },

  // 단일 과제 획득
  retrieveAssignment: ({ commit }, assignmentId) => {
    axios.get(`assignment/detail/${assignmentId}`).then(({ data }) => {
      commit("fetchAssignmentDetail", data);
    });
  },

  // 과제 생성
  updateAssignment: (nothing, payload) => {
    axios
      .put(`assignment/detail/${payload.assignmentId}`, payload.formData, {
        // File 객체가 포함된 FormData를 전송하기 위한 Option 설정
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        confirm(
          "과제 수정이 완료되었습니다. '확인'을 누르시면 이전 화면으로 돌아갑니다."
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
  },

  // 과제 삭제
  removeAssignment: (getters, assignmentId) => {
    axios.delete(`assignment/detail/${assignmentId}`).then(() => {
      confirm("과제가 삭제되었습니다.");
    });
  }
};

const getters = {
  assignmentList(state) {
    return state.assignmentList;
  },

  assignmentDetail(state) {
    return {
      assignmentName: state.assignmentName,
      assignmentDetail: state.assignmentDetail,
      assignmentDate: state.assignmentDate,
      assignmentTime: state.assignmentTime,
      assignmentFile: state.assignmentFile,
      assignmentFileName: state.assignmentFileName
    };
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
