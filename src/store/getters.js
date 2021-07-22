const getters = {
  // 인증 getter ( state의 token 값의 유무로 boolean 값 return )
  isAuth(state) {
    return !!state.token
  }
}

export default getters;
