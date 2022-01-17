import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import UserProfile from '../views/UserProfile.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isLogged = !!localStorage.getItem('token');
  if(isLogged) {
    switch (to.path){
      case '/login':
        return next({path: '/profile'});
      default:
        return next();
    }
  } else if(to.path === '/profile') {
    next({path: '/login'})
  } else {
    next();
  }
})

export default router
