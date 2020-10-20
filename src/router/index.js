import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ProductDetail from '../views/ProductDetail.vue'
import History from '../views/History.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/ProductDetail/:idproduct',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/History',
    name: 'History',
    component: History,
    meta: {
      requireAuth: true
    }
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters['auth/isLogin']) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})

export default router
