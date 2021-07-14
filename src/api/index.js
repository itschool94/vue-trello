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
      throw Error(error) // 정의되지 않은 error 들 처리
    })
}

export const board = {
  fetch() {
    return request('get', '/boards')
  }
}
