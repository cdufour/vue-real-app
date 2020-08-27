import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Christophe' },
    categories: ['nature', 'sport', 'food', 'education'],
    count: 0
  },
  getters: {
    catLength: state => state.categories.length,
    //shortCat: state => state.categories.filter(cat => cat.length < 5)
    shortCat: state => numChar => 
      state.categories.filter(cat => cat.length < numChar)
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    }
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user.name == 'Chris') {
        commit('INCREMENT_COUNT', value)
      }
    }
  },
  modules: {
  }
})
