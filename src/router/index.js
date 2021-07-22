import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import Board from '../components/Board'
import Card from '../components/Card'
import NotFound from '../components/NotFound'

import store from '../store'

Vue.use(VueRouter)

const requireAuth = ( to, from, next ) => {
  const loginPath = `/login?rPath=${ encodeURIComponent( to.path ) }`
  store.getters.isAuth ? next() : next( loginPath );
}

const router = new VueRouter({
  mode: 'history',

  routes : [
    { path: '/', component: Home, beforeEnter : requireAuth },
    { path: '/login', component: Login },

    // 중첩 라우팅 설정 시, 상위 컴포넌트에 하위 컴포넌트가 출력될 부분 지정 필요
    {
      path: '/b/:bid', component: Board, beforeEnter : requireAuth, children: [
        { path: 'c/:cid', component: Card, beforeEnter : requireAuth }
      ]
    },

    { path: '*', component: NotFound }
  ]
})

export default router;
