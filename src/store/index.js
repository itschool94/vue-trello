import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// brower 저장소 확인
const { token } = localStorage
store.commit('LOGIN', token) // LOGIN Mutation 호출

export default store
