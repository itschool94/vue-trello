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
  },

  UPDATE_BOARD( { dispatch, state }, { id, title, bgColor } ) {
    return api.board.update( id, { id, title, bgColor })
      .then( _ => dispatch('FETCH_BOARD', { id: state.board.id }) )
  },

  // context 객체, preload
  ADD_CARD( { dispatch, state }, { title, listId, pos }) {
    return api.card.create( title, listId, pos )
      .then( _ => dispatch('FETCH_BOARD', { id: state.board.id }) )
  },

  FETCH_CARD( { commit }, { id } ) {
    return api.card.fetch(id).then( data => {
      // card 전역으로 넣기( 상태에 넣기 = commit )
      commit('SET_CARD', data.item )
    })
  },

  UPDATE_CARD( { dispatch, state }, { id, title, description, pos, listId }) {
    return api.card.update( id, { title, description, pos, listId })
      .then( _ => dispatch('FETCH_BOARD', { id: state.board.id }) )
  },

  DELETE_CARD( { dispatch, state }, {id} ) {
    return api.card.destroy( id )
      .then( _ => dispatch('FETCH_BOARD', { id: state.board.id }) )
  },

  DELETE_BOARD( _, {id} ) {
    return api.board.destroy( id )
  },

  ADD_LIST( { dispatch, state }, { title, boardId, pos }) {
    return api.list.create( { title, boardId, pos })
      .then( () => dispatch('FETCH_BOARD', { id: state.board.id }) )
  },

  UPDATE_LIST( { dispatch, state }, { id, pos, title }) {
    return api.list.update( id, { pos, title } )
      .then( () => dispatch('FETCH_BOARD', { id: state.board.id }) )
  }
}

export default actions;
