import axios from "axios";
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push('/login') // 로그인 페이지로 이동
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then( result => result.data )
    .catch( error => {
      const { status } = error.response

      if( status === UNAUTHORIZED ) return onUnauthorized()
      throw Error(error)
    })
}

// header 값을 토큰 정보로 설정
export const setAuthInHeader = token => {
  // 글로벌 axios 기본(defaults) 설정
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

export const board = {
  fetch( id ) {
    return id ? request('get', `/boards/${id}`) : request('get', '/boards')
  },
  create( title ) {
    return request('post', '/boards', {title})
  }
}

// 인증을 위한 auth 객체
export const auth = {
  login( email, password ) {
    return request('post','/login', { email, password })
  }
}

export const card = {
  create ( title, listId, pos ) {
    return request('post','/cards', { title, listId, pos })
  },
  fetch(id) {
    return request('get',`/cards/${id}`)
  },
  update(id, payload) {
    return request('put',`/cards/${id}`, payload)
  },
  destroy(id) {
    return request('delete', `/cards/${id}`)
  }
}
