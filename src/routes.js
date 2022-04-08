import { createWebHistory, createRouter } from "vue-router";

import Page404NotFound from './components/Page404NotFound.vue';
import Login from './components/Authentication/Login.vue';
import Register from './components/Authentication/Register.vue';
import Verify from './components/Authentication/Verify.vue';
import Home from './components/Home.vue';
import store from '@/store/';
import * as NProgress from 'nprogress'

const guest = (to, from, next) => {
   if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};
const auth = (to, from, next) => {
  if (localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/auth/login");
  }
};



const routes = [
  {
    path: "/",
    name: "Home",
    component:Home,
  },
  {
    path: "/auth/login",
    name: "Login",
    beforeEnter: guest,
    component:Login,
  },
  {
    path: "/auth/register",
    name: "Register",
    beforeEnter: guest,
    component: Register,
  },
  {
    path: "/auth/verify/:hash",
    name: "Verify",
    beforeEnter: auth,
    props: true,
    component: Verify,
  },
  { 
    name: "NotFound", 
    path: "/:pathMatch(.*)*", 
    component: Page404NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router;
