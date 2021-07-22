import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddBoard: false,
    boards: [], // 모든 board 목록
    token: null
  },

  getters: {
    // 인증 getter ( state의 token 값의 유무로 boolean 값 return )
    isAuth (state) {
      return !!state.token
    }
  },

  mutations: {
    //mutations의 핸들러 함수, 첫번째 매개변수는 state을 받아야 한다.
    SET_IS_ADD_BOARD(state, toggle) {
      state.isAddBoard = toggle
    },

    SET_BOARDS(state, boards) {
      state.boards = boards;
    },

    LOGIN(state, token) {
      if (!token) return;
      state.token = token; // state 갱신
      localStorage.setItem('token', token);
      api.setAuthInHeader(token);
    },

    LOGOUT(state) {
      state.token = null;
      delete localStorage.token;
      api.setAuthInHeader(null);
    }
  },

  //  actions : api 호출과 같은 비동기 로직 담당
  actions: {
    // context객체 사용 안하기 때문에 _
    ADD_BOARD(_, {title}) {
      return api.board.create(title) // Promise를 return
    },
    // context 객체 중에 commit 함수 사용 boards 상태 갱신
    FETCH_BOARDS({commit}) {
      return api.board.fetch().then(data => {
        commit('SET_BOARDS', data.list)
      })
    },

    // LOGIN : ( context 객체, payload )
    LOGIN( {commit}, { email, password }) {
      return api.auth.login( email, password )
        .then( ({accessToken}) => commit('LOGIN', accessToken ))
    }
  }
})

// brower 저장소 확인
const { token } = localStorage
store.commit('LOGIN', token) // LOGIN Mutation 호출

export default store
