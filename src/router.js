import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (localStorage.token) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/Login.vue')
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import( './views/Cards.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import( './views/Result.vue')

    }
  ]
})


