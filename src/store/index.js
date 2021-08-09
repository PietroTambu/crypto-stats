import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinMarketCap: [],
    lastUpdate: '',
    updateState: {
      status: false,
      error: ''
    },
    show: false
  },
  mutations: {
    updateCoinMarketCap (state) {
      state.coinMarketCap = JSON.parse(localStorage.getItem('coinMarketCapData'))
      if (localStorage.getItem('lastUpdate') === null) {
        state.lastUpdate = null
      } else {
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
    updateStateData (state) {
      state.updateState.status = (localStorage.getItem('updateStateStatus') === 'true')
      state.updateState.error = localStorage.getItem('updateStateError')
    },
    overlayRequest (state) {
      state.show = !state.show
    }
  },
  actions: {
  },
  modules: {
  }
})
