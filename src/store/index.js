import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api';

Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    isAddBoard: false
  },
  mutations: {
    //mutations의 핸들러 함수, 첫번째 매개변수는 state을 받아야 한다.
    SET_IS_ADD_BOARD( state, toggle ) {
      state.isAddBoard = toggle
    },
  },
  actions: {
    // context객체 사용 안하기 때문에 _
    ADD_BOARD (_, { title }) {
      return api.board.create( title ) // Promise를 return
    }
  }
})

export default store
