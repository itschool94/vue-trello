import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import NotFound from '../components/NotFound'

// index.js 라우팅 관련 로직만 기재
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',

  routes : [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '*', component: NotFound }
  ]
})

export default router;
