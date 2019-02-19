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
      component: () => import('./views/Admin'),
      children: [
        {
          path: 'posts',
          name: 'posts',
          component: () => import('./views/Posts')
        }
      ]
    }
  ]
})

export default router
