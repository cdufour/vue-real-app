import Vue from 'vue'
import Vuex from 'vuex'

import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //user: { id: 'abc123', name: 'Christophe' },
    categories: ['Nature', 'Sport', 'Food', 'Education'],
    count: 0,
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
    // ATTENTION: les actions sont asynchrones
    updateCount({ state, commit }, value) {
      if (state.user.name == 'Chris') {
        commit('INCREMENT_COUNT', value)
      }
    },
  },
  modules: {
    user,
    event
  }
})
