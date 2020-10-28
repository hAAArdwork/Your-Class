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
