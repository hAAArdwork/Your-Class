import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store";
import LandingPage from "../views/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: { title: "Your Class" },
    // 이미 로그인 한 사용자가 로그인 페이지에 접근하지 못하도록 하는 Router Guard
    beforeEnter: (to, from, next) => {
      if (!Store.getters["auth/hasAccessToken"]) {
        next(); // 토큰이 없다면, 로그인 화면으로 이동한다.
      } else {
        next("/main"); // 토큰이 있다면, 목적 Route로 이동한다.
      }
    }
  },
  {
    path: "/auth",
    component: () => import("../views/Auth.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../components/auth/loginForm.vue"),
        meta: { title: "로그인" }
      },
      {
        path: "register",
        name: "Register",
        component: () => import("../components/auth/registerForm.vue"),
        meta: { title: "회원가입" }
      },
      {
        path: "activate/:uidb64/:token",
        name: "Activate",
        component: () => import("../components/auth/activation.vue"),
        meta: { title: "이메일 인증" }
      }
    ],
    meta: { title: "로그인" },
    // 이미 로그인 한 사용자가 로그인 페이지에 접근하지 못하도록 하는 Router Guard
    beforeEnter: (to, from, next) => {
      if (!Store.getters["auth/hasAccessToken"]) {
        next(); // 토큰이 없다면, 로그인 화면으로 이동한다.
      } else {
        next("/main"); // 토큰이 있다면, 목적 Route로 이동한다.
      }
    }
  },
  {
    path: "/main",
    name: "MainPage",
    component: () => import("../views/MainPage.vue"),
    meta: { title: "메인페이지", requiresAuth: true },
    // 과목 리스트가 이미 Vuex에 있는 경우, 다시 요청하지 않는다.
    beforeEnter: async (to, from, next) => {
      if (Store.getters["classes/classList"] !== null) {
        next();
      }
      // Vuex에 과목 라스트가 아직 없는(=null) 경우,
      else {
        Store.dispatch("classes/retrieveClasses");

        next();
      }
    }
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/Calendar.vue"),
    meta: { title: "일정", requiresAuth: true },
    // 과목 리스트가 이미 Vuex에 있는 경우, 다시 요청하지 않는다.
    beforeEnter: async (to, from, next) => {
      if (Store.getters["schedule/schedule"] !== null) {
        next();
      }
      // Vuex에 과목 라스트가 아직 없는(=null) 경우,
      else {
        Store.dispatch("schedule/retrieveSchedule");

        next();
      }
    }
  },
  {
    path: "/mypage",
    component: () => import("../views/MyPage.vue"),
    children: [
      {
        path: "",
        name: "MyPage",
        component: () => import("../components/mypage/userInfo.vue"),
        meta: { title: "마이페이지", requiresAuth: true }
      }
    ],
    meta: { title: "마이페이지", requiresAuth: true }
  },
  /*
   *  강좌 관련 라우터 집합
   */
  {
    path: "/class/:classId", // URI 매개변수 설정을 통해, 각 과목 식별 가능하도록 설정한다.
    props: true, // props를 true로 설정하면, params를 props의 형태로 받을 수 있다.
    component: () => import("../views/Class.vue"),
    children: [
      {
        path: "",
        props: true,
        name: "classInfo",
        component: () => import("../components/class/classInfo/classInfo.vue"),
        meta: { title: "교과정보" }
      },
      /*
       *  강좌 공지사항 관련 라우터
       */
      {
        path: "notice",
        component: () =>
          import("../components/class/classNotice/classNotice.vue"),
        meta: { title: "공지사항" },
        children: [
          {
            path: "",
            name: "classNotice",
            component: () =>
              import("../components/class/classNotice/noticeBoard.vue"),
            meta: { title: "공지사항" }
          },
          {
            path: "detail",
            name: "noticeDetail",
            component: () =>
              import("../components/class/classNotice/noticeDetail.vue"),
            meta: { title: "공지세부" }
          }
        ]
      },
      /*
       *  강좌 과제 관련 라우터
       */
      {
        path: "assignment",
        component: () =>
          import("../components/class/classAssignment/classAssignment.vue"),
        meta: { title: "과제" },
        children: [
          {
            path: "",
            name: "classAssignment",
            component: () =>
              import("../components/class/classAssignment/assignmentList.vue"),
            meta: { title: "과제확인" }
          },
          // [학생] 관런 페이지
          {
            path: ":assignmentId/submit",
            props: true,
            name: "AssignmentSubmit",
            component: () =>
              import(
                "../components/class/classAssignment/assignmentSubmit.vue"
              ),
            meta: { title: "과제제출" }
          },
          {
            path: ":assignmentId/detail",
            name: "AssignmentSubmitDetail",
            component: () =>
              import("../components/class/classAssignment/assignmentCheck.vue"),
            meta: { title: "제출 정보 확인" }
          },
          {
            path: ":assignmentId/edit",
            props: true,
            name: "SubmitEdit",
            component: () =>
              import("../components/class/classAssignment/submitEdit.vue"),
            meta: { title: "제출 정보 수정" }
          },
          // [교사] 관련 페이지
          {
            path: "check/:assignmentId",
            name: "AssignmnetSubmitCheck",
            component: () =>
              import(
                "../components/class/classAssignment/assignmentSubmitList.vue"
              ),
            meta: { title: "제출 현황 확인" }
          },
          {
            path: "write",
            name: "AssignmentWrite",
            component: () =>
              import(
                "../components/class/classAssignment/assignmentCreate.vue"
              ),
            meta: { title: "과제등록" }
          },
          {
            path: "edit/:assignmentId",
            props: true,
            name: "AssignmentEdit",
            component: () =>
              import("../components/class/classAssignment/assignmentEdit.vue"),
            meta: { title: "과제수정" }
          }
        ]
      },

      /*
       *  질의응답 (QnA) 관련 라우터
       */
      {
        path: "ask",
        component: () =>
          import("../components/class/classQuestion/classQuestion.vue"),
        meta: { title: "질의응답" },
        children: [
          {
            path: "",
            name: "classQuestion",
            component: () =>
              import("../components/class/classQuestion/questionBoard.vue"),
            meta: { title: "질의응답" }
          },
          {
            path: "detail",
            name: "questionDetail",
            component: () =>
              import("../components/class/classQuestion/questionDetail.vue"),
            meta: { title: "질의응답" }
          }
        ]
      },
      /*
       *  괴목 관리 관련 라우터
       */
      {
        path: "manage",
        name: "classManage",
        component: () =>
          import("../components/class/classManage/classManage.vue"),
        meta: { title: "교과관리" }
      }
    ],
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 라우팅 시, 페이지 제목(상단 탭) 변경
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

// 로그인이 필요한 페이지에 접근하는 경우에 대한 Router Guard
router.beforeEach(async (to, from, next) => {
  // localStorage에 토큰이 있는지 확인하고, 자동 로그인 실시.
  await Store.dispatch("auth/autoLogin");

  // 목적 Route가 인증을 요구하는 경우,
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vuex State에 토큰이 없다면, 로그인 화면으로 이동한다.
    if (!Store.getters["auth/hasAccessToken"]) {
      next("/auth");
    }
    // Vuex State에 토큰이 있다면, 다음으로 진행한다.
    else {
      // Vuex State에서 사용자 정보를 확인하고,
      if (Store.state.user.email) {
        next();
      }
      // 비어있는 경우 서버에 요청한다.
      else {
        await Store.dispatch("user/requestUserData");

        console.log("유저 데이터 Fetch 후 다음 라우터로 진행합니다.");

        next();
      }
    }
  }
  // 목적 Route가 인증을 요구하지 않으면, 목적지로 바로 이동한다.
  else {
    next();
  }
});

export default router;
