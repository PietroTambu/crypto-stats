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
    loading: false
  },
  mutations: {
    updateCoinMarketCap (state) {
      state.coinMarketCap = JSON.parse(localStorage.getItem('coinMarketCapData'))
      const date = new Date(localStorage.getItem('lastUpdate'))
      const viewDate = {}
      date.getHours() < 10 ? viewDate.hour = String('0' + date.getHours()) : viewDate.hour = date.getHours()
      date.getMinutes() < 10 ? viewDate.minutes = String('0' + date.getMinutes()) : viewDate.minutes = date.getMinutes()
      date.getSeconds() < 10 ? viewDate.seconds = String('0' + date.getSeconds()) : viewDate.seconds = date.getSeconds()
      state.lastUpdate =
        String(viewDate.hour) + ':' +
        String(viewDate.minutes) + ':' +
        String(viewDate.seconds) + ' - ' +
        String(date.getDate()) + '/' +
        String(date.getMonth() + 1) + '/' +
        String(date.getFullYear())
    },
    updateStateData (state) {
      state.updateState.status = (localStorage.getItem('updateStateStatus') === 'true')
      state.updateState.error = localStorage.getItem('updateStateError')
    },
    overlayRequest (state) {
      state.loading = !state.loading
    },
    resizeTable: function () {}
  },
  actions: {},
  modules: {}
})
