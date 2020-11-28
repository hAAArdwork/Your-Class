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
  noticeList: new Array(),
  commentList: new Array(),

  postId: "",
  postName: "",
  postDetail: "",
  postUpdateDate: "",
  postAuthor: "",
  postAuthorEmail: ""

};

const mutations = {
  fetchNoticeList(state, noticeList) {
    state.noticeList = noticeList;
  },
  fetchCommentList(state, commentList) {
    state.commentList = commentList;
  },
  fetchNoticeDetail(state, notice) {
    state.postId = notice.id;
    state.postName = notice.postName;
    state.postDetail = notice.postDetail;
    state.postUpdateDate = notice.postUpdateDate;
    state.postAuthor = notice.postUserId.name;
    state.postAuthorEmail = notice.postUserId.email;
  },
};

const actions = {
  //공지사항 목록 
  retrieveNoticeList: ( { commit } , classId) => {
    axios
      .get(`post/noticeList/${classId}`)
      .then(({ data }) => {
          let noticeList = new Array();
          let index = 1;

          //각 공지별 정보 저장
          for (let item of data) {
            const noticeInfo = {
              id: item.id,
              index: index,
              noticeName: item.postName,
              noticeDetail: item.postDetail,
              noticeAuthor: item.postUserId.name,
              noticeUpdateDate: item.postUpdateDate

            };
            noticeInfo.noticeUpdateDate =
            noticeInfo.noticeUpdateDate.substring(0, 10) +
            " " +
            noticeInfo.noticeUpdateDate.substring(11, 16);

            noticeList.push(noticeInfo);
            index ++;
          };
          //console.log(noticeList);
  
          commit("fetchNoticeList", noticeList);
      })
      .catch(( ) => {
      });
  },
  //공지사항 등록
  createNotice: (nothing, notice) => {
    axios
    .post("post/createNotice", notice, {
      // File 객체가 포함된 FormData를 전송하기 위한 Option 설정
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      confirm(
        "공지가 등록되었습니다."
      );

      //공지목록으로 돌아가기

    })
    .catch(() =>{});
  },
  //공지사항 세부 내용
  retrieveNoticeDetail: ({ commit }, postId) => {
    axios
      .get(`post/postDetail/${postId}`)
      .then(({ data }) => {
        console.log(data);
        commit("fetchNoticeDetail", data);
      })

  },
  //공지 삭제
  deleteNotice: (getters, postId) => {
    axios
      .delete(`post/postDetail/${postId}`)
      .then(() => {
        confirm("공지가 삭제되었습니다.");

        //목록으로 돌아가기...새로고침...
        router.go(-1);
      })
      .catch(() => {});
  },
  //공지 수정
  editNotice: (nothing, payload) => {
    axios
      .put(`post/postDetail/${payload.postId}`, payload.formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        confirm(
          "공지가 수정되었습니다."
        );
        router.go(-1);
      })
      .catch(()=>{});
  },
  //댓글 목록 
  retrieveComment: (getters, postId) => {
    axios
      .get(`post/commentList/${postId}`)
      .then(({ data }) => {
        console.log(data);
      })

  },
  //댓글 작성
  enterComment: (nothing, comment) => {
    axios
    .post("post/createComment", comment, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      confirm( "댓글이 등록되었습니다." );
    })
  }

  //댓글 삭제


};

const getters = {
  noticeList(state) {
    return state.noticeList;
  },
  noticeDetail(state) {
    return {
      postId: state.postId,
      postName: state.postName,
      postDetail: state.postDetail,
      postUpdateDate: state.postUpdateDate.substring(0, 10) + " " + state.postUpdateDate.substring(11, 16),
      postAuthor: state.postAuthor,
      postAuthorEmail: state.postAuthorEmail,
    };
  },
};

export default {
  // Vuex 저장소 네임스페이스 사용
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
