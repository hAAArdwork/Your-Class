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
  schedule: null,

  isLoading: false
};

const mutations = {
  // 서버로부터 받아온 과목 리스트를 Vuex Store에 저장하는 Commit
  fetchSchedule: (state, schedule) => {
    state.schedule = schedule;
  },

  // Loading Flag Mutation
  fetchLoading(state, payload) {
    state.isLoading = payload;
  }
};

const actions = {
  retrieveSchedule: ({ commit }) => {
    commit("fetchLoading", true);

    axios
      .get("schedule/getEnroll")
      .then(async ({ data }) => {
        // 모든 과목의 과제 정보를 담기위한 배열 초기화
        const color = ["grey", "success", "error"];
        let schedule = new Array();

        for (let enroll of data) {
          const subjectId = enroll.subjectId.id;

          await axios
            .get(`schedule/getAssignment/${subjectId}`)
            .then(async ({ data }) => {
              // 각 과목의 모든 과제물에 대해...
              for (let item of data) {
                const now = new Date();
                let event = new Object();

                // 해당 과제물의 제출 여부를 확인한다.
                await axios
                  .get(`assignment/isSubmit/${item.id}`)
                  .then(({ data }) => {
                    event.isSubmitted = data.isSubmitted;
                  })
                  .catch(({ response }) => {
                    console.log(response);
                  });

                if (now > new Date(item.assignmentDueDate)) {
                  event.isExpired = true;
                } else {
                  event.isExpired = false;
                }

                // 과제 확인 URL을 특정하기 위한 ID
                event.assignmentId = item.id;
                event.subjectId = item.subjectId.id;

                // 이벤트 정보
                event.name = `${item.subjectId.subjectName} - ${item.assignmentName}`;
                event.start = item.assignmentDueDate.substring(0, 10);
                event.end = item.assignmentDueDate.substring(0, 10);
                event.color = event.isSubmitted
                  ? color[0]
                  : event.isExpired
                  ? color[2]
                  : color[1];
                event.details = item.assignmentDetail;

                schedule.push(event);
              }
            })
            .catch(({ response }) => {
              console.log(response);
            });

          commit("fetchSchedule", schedule);
        }
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => {
        commit("fetchLoading", false);
      });
  }
};

const getters = {
  schedule(state) {
    return state.schedule;
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
