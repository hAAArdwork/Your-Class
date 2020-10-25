import Vue from "vue";
import VueRouter from "vue-router";
// import Store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Your Class",
      requiredAuth: true
    }
    // 로그인 상태가 아닐 때, 로그인 화면으로 강제 이동
    // beforeEnter: (to, from, next) => {
    //   if (!Store.getters.loginStatus) {
    //     next("/auth");
    //   } else {
    //     next();
    //   }
    // }
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
