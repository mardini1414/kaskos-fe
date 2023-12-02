import Home from '../pages/Home.vue';
import Member from '../pages/Member.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import GoogleRedirect from '../pages/GoogleRedirect.vue';
import NotFound from '../pages/NotFound.vue';
import * as VueRouter from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/members', component: Member },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/oauth/google', component: GoogleRedirect },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

const isAuthenticated = localStorage.getItem('token');

router.beforeEach((to, from, next) => {
  if (to.path === '/oauth/google') {
    next();
    return 0;
  }
  if (!isAuthenticated && to.path !== '/login' && to.path !== '/register') {
    next({ path: '/login' });
    next({ path: '/register' });
    return 0;
  }
  if (isAuthenticated && to.path === '/login') {
    next({ path: '/' });
    return 0;
  }
  if (isAuthenticated && to.path === '/register') {
    next({ path: '/' });
    return 0;
  }
  next();
});

export default router;
