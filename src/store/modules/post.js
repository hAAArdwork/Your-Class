import router from "@/router";
import axios from "axios";

const state = {
  noticeList: new Array(),
  questionList: new Array(),

  commentList: new Array(),

  postId: "",
  postName: "",
  postDetail: "",
  postUpdateDate: "",
  postAuthor: "",
  postAuthorEmail: "",

  isLoading: false
};

const mutations = {
  fetchNoticeList(state, noticeList) {
    state.noticeList = noticeList;
  },

  fetchQuestionList(state, questionList) {
    state.questionList = questionList;
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

  fetchQuestionDetail(state, question) {
    state.postId = question.id;
    state.postName = question.postName;
    state.postDetail = question.postDetail;
    state.postUpdateDate = question.postUpdateDate;
    state.postAuthor = question.postUserId.name;
    state.postAuthorEmail = question.postUserId.email;
  },

  fetchLoading(state, payload) {
    state.isLoading = payload;
  }
};

const actions = {
  // 공지사항 목록
  retrieveNoticeList: ({ commit }, classId) => {
    axios
      .get(`post/noticeList/${classId}`)
      .then(({ data }) => {
        let noticeList = new Array();
        let index = 1;

        // 각 공지별 정보 저장
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
          index++;
        }

        commit("fetchNoticeList", noticeList);
      })
      .catch(() => {});
  },

  // 공지사항 등록
  createNotice: ({ dispatch }, notice) => {
    axios
      .post("post/createNotice", notice, {
        // File 객체가 포함된 FormData를 전송하기 위한 Option 설정
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        console.log(data);

        confirm("공지가 성공적으로 등록되었습니다.");

        // 변경된 공지사항 목록을 다시 받아온다.
        dispatch("retrieveNoticeList", data.postSubjectId.id);
      })
      .catch(() => {
        alert("공지사항 등록에 실패했습니다.");
      });
  },

  // 단일 공지사항의 내용과 연결된 댓글을 모두 가져온다.
  retrieveNoticeDetail: ({ commit }, postId) => {
    axios.get(`post/postDetail/${postId}`).then(({ data }) => {
      console.log(data);

      axios.get(`post/commentList/${postId}`).then(({ data }) => {
        console.log(data);

        commit("fetchCommentList", data.reverse());
      });

      commit("fetchNoticeDetail", data);
    });
  },

  // 공지 수정
  updateNotice: ({ dispatch }, payload) => {
    axios
      .put(`post/postDetail/${payload.postId}`, payload.formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        console.log(data);
        confirm("공지사항이 성공적으로 수정되었습니다.");

        // 변경된 공지사항 내용을 다시 받아온다.
        dispatch("retrieveNoticeDetail", data.id);
      })
      .catch(() => {
        confirm("공지사항 수정에 실패했습니다.");
      });
  },

  // 공지 삭제
  deleteNotice: (getters, postId) => {
    axios
      .delete(`post/postDetail/${postId}`)
      .then(() => {
        confirm("공지사항이 성공적으로 삭제되었습니다.");

        //목록으로 돌아가기...새로고침...
        router.go(-1);
      })
      .catch(() => {
        alert("공지사항 삭제에 실패했습니다.");
      });
  },

  // 질의응답 목록
  retrieveQuestionList: ({ commit }, classId) => {
    axios
      .get(`post/questionList/${classId}`)
      .then(({ data }) => {
        console.log(data);
        let questionList = new Array();
        let index = 1;

        // 각 공지별 정보 저장
        for (let item of data) {
          const questionInfo = {
            id: item.id,
            index: index,
            questionName: item.postName,
            questionDetail: item.postDetail,
            questionAuthor: item.postUserId.name,
            questionUpdateDate: item.postUpdateDate
          };
          questionInfo.questionUpdateDate =
            questionInfo.questionUpdateDate.substring(0, 10) +
            " " +
            questionInfo.questionUpdateDate.substring(11, 16);

          questionList.push(questionInfo);
          index++;
        }

        commit("fetchQuestionList", questionList);
      })
      .catch(() => {});
  },

  // 질문 등록
  createQuestion: ({ dispatch }, question) => {
    axios
      .post("post/createQuestion", question, {
        // File 객체가 포함된 FormData를 전송하기 위한 Option 설정
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        console.log(data);

        confirm("질문이 성공적으로 등록되었습니다.");

        // 변경된 공지사항 목록을 다시 받아온다.
        dispatch("retrieveQuestionList", data.postSubjectId.id);
      })
      .catch(() => {
        alert("질문 등록에 실패했습니다.");
      });
  },

  // 단일 질문의 내용과 연결된 댓글을 모두 가져온다.
  retrieveQuestionDetail: ({ commit }, postId) => {
    axios.get(`post/postDetail/${postId}`).then(({ data }) => {
      console.log(data);

      axios.get(`post/commentList/${postId}`).then(({ data }) => {
        console.log(data);

        commit("fetchCommentList", data.reverse());
      });

      commit("fetchQuestionDetail", data);
    });
  },

  // 질문 수정
  updateQuestion: ({ dispatch }, payload) => {
    axios
      .put(`post/postDetail/${payload.postId}`, payload.formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        console.log(data);
        confirm("질문이 성공적으로 수정되었습니다.");

        // 변경된 공지사항 내용을 다시 받아온다.
        dispatch("retrieveQuestionDetail", data.id);
      })
      .catch(() => {
        confirm("질문 수정에 실패했습니다.");
      });
  },

  // 질문 삭제
  deleteQuestion: (getters, postId) => {
    axios
      .delete(`post/postDetail/${postId}`)
      .then(() => {
        confirm("질문이 성공적으로 삭제되었습니다.");

        //목록으로 돌아가기...새로고침...
        router.go(-1);
      })
      .catch(() => {
        alert("질문 삭제에 실패했습니다.");
      });
  },

  // 댓글 작성
  createComment: ({ commit }, formData) => {
    axios
      .post("post/createComment", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        console.log(data);

        axios
          .get(`post/commentList/${data.commentPostId.id}`)
          .then(({ data }) => {
            commit("fetchCommentList", data.reverse());
          });
      })
      .catch(() => {
        alert("댓글을 등록하는 도중 문제가 발생하였습니다.");
      });
  },

  // 댓글 목록
  retrieveCommentList: ({ commit }, postId) => {
    axios
      .get(`post/commentList/${postId}`)
      .then(({ data }) => {
        commit("fetchCommentList", data.reverse());
      })
      .catch(() => {
        alert("댓글 목록을 받아오는 도중 문제가 발생하였습니다.");
      });
  },

  // 댓글 수정
  updateComment: ({ dispatch }, target) => {
    axios
      .put(`post/commentDetail/${target.commentId}`, {
        commentDetail: target.commentDetail
      })
      .then(({ data }) => {
        console.log(data);

        dispatch("retrieveCommentList", target.postId);
      })
      .catch(() => {
        alert(`댓글 수정에 실패했습니다.`);
      });
  },

  // 댓글 삭제
  deleteComment: ({ dispatch }, target) => {
    axios
      .delete(`post/commentDetail/${target.id}`)
      .then(() => {
        dispatch("retrieveCommentList", target.commentPostId.id);
      })
      .catch(() => {
        alert("댓글 삭제에 실패했습니다.");
      });
  }
};

const getters = {
  noticeList(state) {
    return state.noticeList;
  },

  commentList(state) {
    return state.commentList;
  },

  noticeDetail(state) {
    return {
      postId: state.postId,
      postName: state.postName,
      postDetail: state.postDetail,
      postUpdateDate:
        state.postUpdateDate.substring(0, 10) +
        " " +
        state.postUpdateDate.substring(11, 16),
      postAuthor: state.postAuthor,
      postAuthorEmail: state.postAuthorEmail
    };
  },

  questionList(state) {
    return state.questionList;
  },

  questionDetail(state) {
    return {
      postId: state.postId,
      postName: state.postName,
      postDetail: state.postDetail,
      postUpdateDate:
        state.postUpdateDate.substring(0, 10) +
        " " +
        state.postUpdateDate.substring(11, 16),
      postAuthor: state.postAuthor,
      postAuthorEmail: state.postAuthorEmail
    };
  },

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
