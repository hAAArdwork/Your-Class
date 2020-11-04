import Vue from "vue";
import VueRouter from "vue-router";
// import Store from "../store";
import LandingPage from "../views/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: {
      title: "Your Class"
      // requiredAuth: true
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
    meta: { title: "로그인" }
  },
  {
    path: "/main",
    name: "MainPage",
    component: () => import("../views/MainPage.vue"),
    meta: { title: "메인" }
  },
  {
    path: "/mypage",
    component: () => import("../views/MyPage.vue"),
    children: [
      {
        path: "",
        name: "MyPage",
        component: () => import("../components/mypage/userInfo.vue"),
        meta: { title: "마이페이지" }
      }
    ],
    meta: { title: "마이페이지" }
  },
  {
    path: "/class",
    name: "Class",
    component: () => import("../views/Class.vue"),
    children: [
      {
        path: "",
        name: "classInfo",
        component: () => import("../components/class/classInfo/classInfo.vue"),
        meta: { title: "교과정보" }
      },
      {
        path: "notice",
        name: "classNotice",
        component: () =>
          import("../components/class/classNotice/classNotice.vue"),
        meta: { title: "교과정보" }
      },
      {
        path: "assignment",
        name: "classAssignment",
        component: () =>
          import("../components/class/classAssignment/classAssignment.vue"),
        meta: { title: "교과정보" }
      },
      {
        path: "ask",
        name: "classQuestion",
        component: () =>
          import("../components/class/classQuestion/classQuestion.vue"),
        meta: { title: "교과정보" }
      },
      {
        path: "manage",
        name: "classManage",
        component: () =>
          import("../components/class/classManage/classManage.vue"),
        meta: { title: "교과정보" }
      }
    ]
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

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiredAuth)) {
//     if (!store.getters.loginStatus) {
//       next("/login");
//     } else {
//       next();
//     }
//   }
// });

export default router;
