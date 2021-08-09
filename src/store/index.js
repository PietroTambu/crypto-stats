import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinMarketCap: [],
    lastUpdate: ''
  },
  mutations: {
    updateCoinMarketCap (state) {
      state.coinMarketCap = JSON.parse(localStorage.getItem('coinMarketCapData'))
      const date = new Date(localStorage.getItem('lastUpdate'))
      state.lastUpdate =
        String(date.getHours()) + ':' +
        String(date.getMinutes()) + ':' +
        String(date.getSeconds()) + ' - ' +
        String(date.getDate()) + '/' +
        String(date.getMonth() + 1) + '/' +
        String(date.getFullYear())
    }
  },
  actions: {
  },
  modules: {
  }
})
