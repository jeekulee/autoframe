import Vue from 'vue'
import Router from 'vue-router'
import server from './server'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/HelloWorld').default
    },
    ...server
  ]
})
