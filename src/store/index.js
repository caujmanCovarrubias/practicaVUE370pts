import { createStore } from 'vuex';

const store = createStore({
  state: {
    count: 0,
    baseUrl: "http://localhost:3000"
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    getBaseUrl(state) {
      return state.baseUrl;
    }
  }
});

export default store;