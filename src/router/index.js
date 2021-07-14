import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import Board from '../components/Board'
import Card from '../components/Card'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const requireAuth = ( to, from, next ) => {
  const isAuth = localStorage.getItem('token');
  // URI로 데이터를 전달하기 위해서 문자열을 인코딩
  const loginPath = `/login?rPath=${ encodeURIComponent( to.path ) }`
  isAuth ? next() : next( loginPath );
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
