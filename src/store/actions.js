//  actions : api 호출과 같은 비동기 로직 담당, api 응답값 처리
import * as api from '../api'

const actions =  {
  // LOGIN : ( context 객체, payload )
  LOGIN( {commit}, { email, password }) {
    return api.auth.login( email, password )
      .then( ({accessToken}) => commit('LOGIN', accessToken ))
  },

  ADD_BOARD(_, {title}) {
    // Promise를 return
    return api.board.create(title).then( data => data.item )
  },

  // context 객체 중에 commit 함수 사용 boards 상태 갱신
  FETCH_BOARDS({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },

  FETCH_BOARD( { commit }, { id }) {
    return api.board.fetch(id).then( data => {
      // 변이 호출
      commit('SET_BOARD', data.item )
    })
  }
}

export default actions;
