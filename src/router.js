import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin')
    },
    {
      path: '/admin/posts',
      name: 'posts',
      component: () => import('./views/Posts'),
      meta: {
        require_auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.matched.some(record => record.meta.require_auth)) {
    if (!window.localStorage.getItem('isLogged')) {
      next('/')
    }
    next()
  } else {
    next()
  }
})

export default router
