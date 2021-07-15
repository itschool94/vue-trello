import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'

new Vue ({
  el: '#app',
  router,
  // 뷰 인스턴스의 store 속성에 연결
  store,
  render: h => h(App)
})
