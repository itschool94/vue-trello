import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import Board from '../components/Board'
import Card from '../components/Card'
import NotFound from '../components/NotFound'

// index.js 라우팅 관련 로직만 기재
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',

  routes : [
    { path: '/', component: Home },
    { path: '/login', component: Login },

    // 중첩 라우팅 설정 시, 상위 컴포넌트에 하위 컴포넌트가 출력될 부분 지정 필요
    {
      path: '/b/:bid', component: Board, children: [
        { path: 'c/:cid', component: Card }
      ]
    },

    { path: '*', component: NotFound }
  ]
})

export default router;
