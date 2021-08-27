
import OfflineData from '../assets/OfflineData.json'
import lodash from './lodash'

const axios = require('axios')

const service = {
  async axiosRequest () {
    const options = {
      method: 'GET',
      url: 'https://cors.bridged.cc/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        start: 1,
        limit: 100,
        convert: 'USD'
      },
      headers: {
        Accept: 'application/json',
        'X-CMC_PRO_API_KEY': process.env.VUE_APP_COIN_MARKET_CAP_API
      },
      json: true
    }
    try {
      const response = await axios.request(options)
      const data = lodash.lodashCheck(response.data.data)
      localStorage.setItem('coinMarketCapData', JSON.stringify(data))
      localStorage.setItem('lastUpdate', String(new Date()))
      localStorage.setItem('updateStateStatus', String(true))
      localStorage.setItem('updateStateError', 'No Error')
      return true
    } catch (error) {
      console.log(error)
      localStorage.setItem('updateStateStatus', String(false))
      localStorage.setItem('updateStateError', error)
      console.error(error)
      if (localStorage.getItem('coinMarketCapData') === null) {
        localStorage.setItem('coinMarketCapData', JSON.stringify(OfflineData))
        localStorage.setItem('lastUpdate', String(new Date(2021, 7, 24, 15, 5, 0)))
      }
      return false
    }
  }
}

export default service
