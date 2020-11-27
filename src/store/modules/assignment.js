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

  submitList: new Array(),

  // 단일 과제 세부 내역
  assignmentName: "",
  assignmentDetail: "",
  assignmentDate: "",
  assignmentTime: "",
  assignmentFile: "",
  assignmentFileName: "",

  submit: {
    id: "",
    submitDetail: "",
    submitUpdateDate: "",
    submitFile: "",
    submitFileName: "",
    assignmentName: "",
    assignmentDetail: "",
    assignmentfile: "",
    assignmentDueDate:""
  }
};

const mutations = {
  // 과제 목록을 Vuex Store에 반영한다.
  fetchAssignmentList(state, assignmentList) {
    state.assignmentList = assignmentList;
  },

  // 과제 제출자 목록을 Vuex Store에 반영한다.
  fetchSubmitList(state, submitList) {
    state.submitList = submitList;
  },

  fetchAssignmentDetail(state, assignemntData) {
    state.assignmentName = assignemntData.assignmentName;
    state.assignmentDetail = assignemntData.assignmentDetail;
    state.assignmentDate = assignemntData.assignmentDueDate.substring(0, 10);
    state.assignmentTime = assignemntData.assignmentDueDate.substring(11, 16);
    state.assignmentFile = assignemntData.assignmentFile;
    state.assignmentFileName = assignemntData.assignmentFileName;
  },
  fetchSubmit(state, submit){
    state.submit.id = submit.id;
    state.submit.submitDetail = submit.submitDetail;
    state.submit.submitUpdateDate = submit.submitUpdateDate;
    state.submit.submitFile = submit.submitFile;
    state.submit.submitFileName = submit.submitFileName;
    state.submit.assignmentName = submit.assignmentName;
    state.submit.assignmentDetail = submit.assignmentDetail;
    state.submit.assignmentfile = submit.assignmentfile;
    state.submit.assignmentDueDate = submit.assignmentDueDate;
  }
};

const actions = {
  // 전체 제출자 명단 및 제출 여부 확인
  retrieveSubmitterList: ({ commit }, payload) => {
    axios
      .get("subject/subjectenroll", { params: { Id: payload.classId } })
      .then(async ({ data }) => {
        let submitList = new Array();
        let index = 0;

        for (let item of data) {
          // 첫번째 유저(=선생님)을 제외한다.
          if (index === 0) {
            index++;
            continue;
          }

          const studentInfo = item.userId;
          // 제출자 및 과제 정보 데이터
          const submitter = {
            name: studentInfo.name,
            email: studentInfo.email,
            number: index,
            assignmentId: null,
            submitId: null,
            submitDetail: "-",
            submitFile: null,
            submitFileName: null,
            submitDate: "-"
          };

          const userId = studentInfo.id; // 학생 Primary ID

          await axios
            .get(`assignment/isSubmit/${payload.assignmentId}/${userId}`)
            .then(async ({ data }) => {
              submitter.isSubmitted = data.isSubmitted;

              if (data.isSubmitted === 0) {
                return;
              }

              await axios
                .get(
                  `assignment/isSubmit/detail/${userId}/${payload.assignmentId}`
                )
                .then(({ data }) => {
                  console.log(data);
                  submitter.number = index;
                  submitter.assignmentId = data.assignmentId.id;
                  submitter.submitId = data.id;
                  submitter.submitDetail = data.submitDetail;
                  submitter.submitFile = data.submitFile;
                  submitter.submitFileName = data.submitFileName;
                  submitter.submitDate =
                    data.submitUpdateDate.substring(0, 10) +
                    " " +
                    data.submitUpdateDate.substring(11, 16);
                });
            });

          submitList.push(submitter);

          index++;
        }

        console.log(submitList);

        commit("fetchSubmitList", submitList);
      })

      .catch(() => {});
  },

  // 과제 리스트
  retrieveAssignmentList: ({ commit }, classId) => {
    axios
      .get(`assignment/list/${classId}`)
      .then(async ({ data }) => {
        console.log(data);
        let assignmentList = new Array();
        for (let item of data) {
          console.log(item);
          const assignmentInfo = item;

          //제출 여부 get
          await axios
          .get(`assignment/isSubmit/${item.id}`)
          .then(({ data }) => {
            console.log(data);
            assignmentInfo.isSubmitted = data.isSubmitted;
          })
          .catch(() => {});

          assignmentInfo.assignmentDueDate = assignmentInfo.assignmentDueDate.substring(0,10) + ' ' + assignmentInfo.assignmentDueDate.substring(11,16);
          assignmentInfo.assignmentUpdateDate = assignmentInfo.assignmentUpdateDate.substring(0,10) + ' ' + assignmentInfo.assignmentUpdateDate.substring(11,16);
          assignmentList.push(assignmentInfo);
        }
        //console.log(assignmentList);

        console.log(assignmentList);

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

  // 과제 제출 내역
  retrieveSubmit: ({ commit }, assignmentId) => {
    axios
      .get(`assignment/submit/detail/${assignmentId}`)
      .then(({ data }) => {
        console.log(data);
        const submit = {
          id: data.id,
          submitUpdateDate: data.submitUpdateDate.substring(0,10) + ' ' + data.submitUpdateDate.substring(11,16),
          submitDetail: data.submitDetail,
          submitFile: data.submitFile,
          submitFileName: data.submitFileName,
          assignmentName: data.assignmentId.assignmentName,
          assignmentDetail: data.assignmentId.assignmentDetail,
          assignmentfile: data.assignmentId.assignmentFile,
          assignmentDueDate: data.assignmentId.assignmentDueDate.substring(0,10) + ' ' + data.assignmentId.assignmentDueDate.substring(11,16)
        };

        console.log(submit);
        
      commit("fetchSubmit", submit);
      })
      .catch(() => {});
  },

   // 과제 생성
  submitAssignment: (nothing, submitData) => {
    axios
      .post("assignment/submit/create", submitData, {
        // File 객체가 포함된 FormData를 전송하기 위한 Option 설정
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        confirm(
          "과제 제출이 완료되었습니다. '확인'을 누르시면 이전 화면으로 돌아갑니다."
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

  //
};

const getters = {
  assignmentList(state) {
    return state.assignmentList;
  },

  submitList(state) {
    return state.submitList;
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
  },

  submitDetail(state) {
    return state.submit;
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
