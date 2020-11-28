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

const state = {
  classList: null,

  classDetail: {
    title: null,
    instructor: null,
    classGrade: null,
    classNumber: null,
    timeTable: null,
    invitationCode: null
  },

  studentList: new Array(),

  searchedClass: {
    title: null,
    instructor: null,
    instructorEmail: null,
    classGrade: null,
    classNumber: null,
    timeTable: null
  },

  isLoading: false,
  isFound: false
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

  // 초대 코드로 검색된 과목 정보를 Vuex Store에 저장하는 Commit
  fetchSearchedClass: (state, searchedClass) => {
    state.searchedClass.title = searchedClass.title;
    state.searchedClass.instructor = searchedClass.instructor;
    state.searchedClass.instructorEmail = searchedClass.instructorEmail;
    state.searchedClass.classGrade = searchedClass.classGrade;
    state.searchedClass.classNumber = searchedClass.classNumber;
    state.searchedClass.timeTable = searchedClass.timeTable;
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

  // 검색된 과목 정보를 초기화하기 위한 Commit
  clearSearchedClass: state => {
    state.searchedClass.title = null;
    state.searchedClass.instructor = null;
    state.searchedClass.instructorEmail = null;
    state.searchedClass.classGrade = null;
    state.searchedClass.classNumber = null;
    state.searchedClass.timeTable = null;
  },

  updateInvitationCode: (state, newCode) => {
    state.classDetail.invitationCode = newCode;
  },

  updateTimeTable: (state, newTimeTable) => {
    state.classDetail.timeTable = newTimeTable;
  },

  fetchStudentList: (state, studentList) => {
    state.studentList = studentList;
  },

  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  },

  // Found Flag Mutation
  fetchFound(state, payload) {
    state.isFound = payload;
  }
};

const actions = {
  retrieveClasses: ({ commit }) => {
    commit("fetchLoading", true);

    axios
      .get("subject/enroll")
      .then(({ data }) => {
        let classList = new Array();

        // 서버로부터 도착한 과목 정보 Parsing
        for (let item of data) {
          const classInfo = item.subjectId;

          classList.push(classInfo);
        }

        commit("fetchClassList", classList);
      })
      // 오류 발생 시, 서버로부터 반환 된 에러 데이터를 가져온다.
      .catch(({ response }) => {
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
      })
      .finally(() => {
        commit("fetchLoading", false);
      });
  },

  retrieveClassDetail: ({ commit }, classId) => {
    axios
      .get(`subject/detail/${classId}`)
      .then(({ data }) => {
        // 서버로부터 전송받은 데이터 Parsing
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
        if (response.status == 400) {
          alert("죄송합니다. 시간표를 빈 값으로 수정할 수 없습니다.");
        }
      });
  },

  deleteClass: (nothing, classId) => {
    axios
      .delete(`subject/detail/${classId}`)
      .then(() => {
        confirm("해당 과목이 성공적으로 삭제되었습니다.");

        // 메인 페이지로 리다이렉트한다.
        router.replace({ name: "MainPage" });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },

  searchClass: ({ commit }, invitationCode) => {
    commit("fetchFound", false);

    axios
      .get(`subject/invite/${invitationCode}`)
      .then(({ data }) => {
        commit("fetchFound", true);

        // 검색된 과목 정보를 필요에 맞게 Parsing
        const searchedClass = {
          title: data.subjectName,
          instructor: data.subjectInstructorId.name,
          instructorEmail: data.subjectInstructorId.email,
          classGrade: String(data.subjectGrade),
          classNumber: String(data.subjectClass),
          timeTable: data.subjectTimeList
        };

        commit("fetchSearchedClass", searchedClass);
      })
      .catch(({ response }) => {
        if (response.status == 404) {
          // alert("입력하신 과목 코드에 알맞는 과목이 없습니다.");
        }
      });
  },

  enroll: ({ dispatch }, invitationCode) => {
    axios
      .post(`subject/invite/enroll/${invitationCode}/`)
      .then(({ data }) => {
        confirm(
          `${data.subjectId.subjectName} 과목이 성공적으로 등록되었습니다.`
        );

        // 과목 생성 성공 시, 과목 리스트를 갱신한다.
        dispatch("retrieveClasses");
      })
      .catch(({ response }) => {
        if (response.status == 400) {
          alert("해당 과목이 이미 등록되어있습니다!");
        }
      });
  },

  removeStudent: (getters, payload) => {
    const subjectId = payload.classId;
    const userId = payload.studentId;

    axios
      .delete(`subject/enroll/delete/${subjectId}/${userId}`)
      .then(() => {
        confirm("학생이 성공적으로 삭제되었습니다.");
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
};

const getters = {
  classList(state) {
    return state.classList;
  },
  studentList(state) {
    return state.studentList;
  },
  classDetail(state) {
    let classDetail = state.classDetail;

    if (classDetail.timeTable !== null) {
      classDetail.timeTable = classDetail.timeTable.split(",").join(", ");
    }

    return classDetail;
  },
  searchedClass(state) {
    let searchedClass = state.searchedClass;

    if (searchedClass.timeTable !== null) {
      searchedClass.timeTable = searchedClass.timeTable.split(",").join(", ");
    }

    return searchedClass;
  },
  // 로딩 여부 반환
  isLoading(state) {
    return state.isLoading;
  },
  // 검색 성공 여부 반환
  isFound(state) {
    return state.isFound;
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
