// import axios from "axios";
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
  classList: new Array(),

  classDetail: {
    title: null,
    instructor: null,
    classGrade: null,
    classNumber: null,
    timeTable: null,
    invitationCode: null
  },
  studentList: new Array(),
  isLoading: false
};

const mutations = {
  // 서버로부터 받아온 과목 리스트를 Vuex Store에 저장하는 Commit
  fetchClassList: (state, classList) => {
    state.classList = classList;
  },
  // 서버로부터 받아온 과목 세부 정보를 Vuex Store에 저장하는 Commit
  fetchClassDetail: (state, classDetail) => {
    state.classDetail.title = classDetail.title;
    state.classDetail.instructor = classDetail.instructor;
    state.classDetail.classGrade = classDetail.classGrade;
    state.classDetail.classNumber = classDetail.classNumber;
    state.classDetail.timeTable = classDetail.timeTable;
    state.classDetail.invitationCode = classDetail.invitationCode;
  },
  // 과목 세부 정보를 초기화하기 위한 Commit
  clearClassDetail: state => {
    state.classDetail.title = null;
    state.classDetail.instructor = null;
    state.classDetail.classGrade = null;
    state.classDetail.classNumber = null;
    state.classDetail.timeTable = null;
    state.classDetail.invitationCode = null;
  },
  updateInvitationCode: (state, newCode) => {
    state.classDetail.invitationCode = newCode;
  },
  updateTimeTable: (state, newTimeTable) => {
    state.classDetail.timeTable = newTimeTable;
  },
  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  },
  fetchStudentList: (state, studentList) => {
    state.studentList = studentList;
  }
};

const actions = {
  retrieveClasses: ({ commit }) => {
    axios
      .get("subject/enroll")
      .then(({ data }) => {
        let classList = new Array();

        // 서버로부터 도착한 과목 정보 Parsing
        for (let item of data) {
          const classInfo = item.subjectId;

          classList.push(classInfo);
        }

        console.log(classList);

        commit("fetchClassList", classList);
      })
      // 오류 발생 시, 서버로부터 반환 된 에러 데이터를 가져온다.
      .catch(({ response }) => {
        console.log(response);

        // Bad Request (400) 에러 처리
        if (response.status == 400) {
          alert("HTTP 400 - 잘못된 요정입니다.");
        }
        // Unauthorized (401) 에러 처리
        else if (response.status == 401) {
          alert("인증되지 않은 상태입니다.");
        }
        // Not Found(404) 에러 처리
        else if (response.status == 404) {
          alert("HTTP 404 - 연결이 원활하지 못합니다. 잠시 후 시도해주세요.");
        }
      });
  },

  retrieveClassDetail: ({ commit }, classId) => {
    axios
      .get(`subject/detail/${classId}`)
      .then(({ data }) => {
        console.log(data);

        // 서버로부터 전송받은 데이터 Parsign
        const classDetail = {
          title: data.subjectName,
          instructor: data.subjectInstructorId.name,
          classGrade: String(data.subjectGrade),
          classNumber: String(data.subjectClass),
          timeTable: data.subjectTimeList,
          invitationCode: data.invitationCode
        };

        commit("fetchClassDetail", classDetail);
      })
      // 오류 발생 시, 서버로부터 반환 된 에러 데이터를 가져온다.
      .catch(({ response }) => {
        console.log(response);

        // Bad Request (400) 에러 처리
        if (response.status == 400) {
          alert("HTTP 400 - 잘못된 요정입니다.");
        }
        // Unauthorized (401) 에러 처리
        else if (response.status == 401) {
          alert("인증되지 않은 상태입니다.");
        }
        // Not Found(404) 에러 처리
        else if (response.status == 404) {
          alert("HTTP 404 - 연결이 원활하지 못합니다. 잠시 후 시도해주세요.");
        }
      });
  },

  retrieveStudentList: ({ commit }, classId) => {
    axios
      .get("subject/subjectenroll", { params: { Id: classId } })
      .then(({ data }) => {
        console.log(data);
        //console.log(data[0].userId.name);
        let studentList = new Array();

        for (let item of data) {
          const studentInfo = item.userId;
          studentList.push(studentInfo);
        }

        commit("fetchStudentList", studentList);
      })

      .catch(() => {});
  },

  createClass: ({ commit, dispatch }, formData) => {
    // Loading Flag를 true로 바꾼다.
    commit("fetchLoading", true);

    axios
      .post("subject/create", {
        subjectName: formData.title,
        subjectGrade: formData.grade,
        subjectClass: formData.classNumber,
        subjectTimeList: formData.timeTable
      })
      .then(() => {
        // 과목 생성 성공 시, 과목 리스트를 갱신한다.
        dispatch("retrieveClasses");
      })
      .catch(({ response }) => {
        console.log(response);
        // 로그인 오류 시, 서버로부터 반환 된 에러 데이터를 가져온다.

        // Bad Request (400) 에러 처리
        if (response.status == 400) {
          if (response.data["email"] && response.data["password"]) {
            alert("이메일, 비밀번호를 입력해주세요.");
          } else if (response.data["email"]) {
            alert("이메일을 입력해주세요.");
          } else if (response.data["password"]) {
            alert("비밀번호를 입력해주세요.");
          } else {
            alert("HTTP 400 - 잘못된 요정입니다.");
          }
        }
        // Unauthorized (401) 에러 처리
        else if (response.status == 401) {
          alert("이메일 또는 비밀번호가 옳지 않습니다. 다시 확인해주세요.");
        }
        // Not Found(404) 에러 처리
        else if (response.status == 404) {
          alert("HTTP 404 - 연결이 원활하지 못합니다. 잠시 후 시도해주세요.");
        }
      })
      .finally(() => {
        // Loading Flag를 false로 설정한다.
        commit("fetchLoading", false);
      });
  },

  // 과목 초대 코드를 갱신하기 위한 Action
  refreshInvitationCode: ({ commit }, classId) => {
    axios
      .put(`subject/reset/${classId}/`, { invitationCode: null })
      .then(({ data }) => {
        const newCode = data.invitationCode;

        commit("updateInvitationCode", newCode);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },

  // 과목 시간표를 갱신하기 위한 Action
  updateTimeTable: ({ commit }, payload) => {
    const classId = payload.classId;
    const newTimeTable = payload.timeTable;

    console.log(newTimeTable);

    axios
      .put(`subject/detail/${classId}/`, {
        subjectTimeList: newTimeTable
      })
      .then(({ data }) => {
        const newTimeTable = data.subjectTimeList;

        commit("updateTimeTable", newTimeTable);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },

  deleteClass: (getters, classId) => {
    axios
      .delete(`subject/detail/${classId}`)
      .then(() => {
        confirm("해당 과목이 성공적으로 삭제되었습니다.");

        // 메인 페이지로 리다이렉트한다.
        router.replace({ name: "MainPage" });
      })
      .catch(error => {
        console.log(error);
      });
  },

  removeStudent: ( getters, payload) => {
    const subjectId = payload.classId;
    const userId = payload.studentId;
    
    axios
    .delete(`subject/enroll/delete/${subjectId}/${userId}`)
    .then(() => {
      confirm("학생이 성공적으로 삭제되었습니다.");
    })
  }
};

const getters = {
  classList(state) {
    return state.classList;
  },
  classDetail(state) {
    let classDetail = state.classDetail;

    if (classDetail.timeTable !== null) {
      classDetail.timeTable = classDetail.timeTable.split(",").join(", ");
    }

    return classDetail;
  },
  studentList(state) {
    return state.studentList;
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
