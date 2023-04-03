import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useUserStore } from '../store/user'
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/course",
    name: "Course",
    component: () =>
      import('../views/Course.vue')
  },
  {
    path: "/course-info/:id",
    name: "CourseInfo",
    component: () =>
      import(/* webpackChunkName: "CourseInfo" */ "../views/Course-Info.vue"),
  },
  {
    path: '/course-play/:courseId/:chapterId',
    name: 'course-play',
    component: () =>
      import(/* webpackChunkName: "CoursePlay" */ "../views/Course-play.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    beforeEnter: (to, from, next) => {
      if (useUserStore().userInfo.id) {
        next()
      } else {
        next('/login')
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;