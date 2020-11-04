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
    meta: { title: "Your Class" }
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
    meta: { title: "메인", requiresAuth: true }
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
      {
        path: "notice",
        name: "classNotice",
        component: () =>
          import("../components/class/classNotice/classNotice.vue"),
        meta: { title: "공지사항" }
      },
      {
        path: "assignment",
        name: "classAssignment",
        component: () =>
          import("../components/class/classAssignment/classAssignment.vue"),
        meta: { title: "과제" }
      },
      {
        path: "ask",
        name: "classQuestion",
        component: () =>
          import("../components/class/classQuestion/classQuestion.vue"),
        meta: { title: "질의응답" }
      },
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
    // Vuex State의 토큰 정보를 확인한다.

    if (!Store.getters["auth/hasAccessToken"]) {
      next("/auth"); // 토큰이 없다면, 로그인 화면으로 이동한다.
    } else {
      next(); // 토큰이 있다면, 목적 Route로 이동한다.
    }
  }
  // 목적 Route가 인증을 요구하지 않으면, 목적지로 바로 이동한다.
  else {
    next();
  }
});

export default router;
