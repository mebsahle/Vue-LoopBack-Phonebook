import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Logout from '@/components/Logout'
import ChangePassword from '@/components/ChangePassword' // commit 9 or the ninth-branch
import PasswordResetRequest from '@/components/PasswordResetRequest'
import PasswordReset from '@/components/PasswordReset'
import AccountActivation from '@/components/AccountActivation'
import Profile from '@/components/Profile'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/password-reset-request',
    name: 'PasswordResetRequest',
    component: PasswordResetRequest
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/verified',
    name: 'AccountVerified',
    component: AccountActivation
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('in routes', to.matched.some(record => record.meta.requiresAuth))
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
