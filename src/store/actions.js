//  actions : api 호출과 같은 비동기 로직 담당
import * as api from '../api'

const actions =  {
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

export default actions;
