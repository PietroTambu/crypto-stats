/* eslint-disable */
// noinspection JSUnresolvedVariable
import Offlinedata from '../assets/OfflineData.json'

const axios = require('axios')

const service = {
  async axiosRequest () {
    const options = {
      method: 'GET',
      url: 'https://cors.bridged.cc/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        'start': 1,
        'limit': 100,
        'convert': 'USD'
      },
      headers: {
        Accept: 'application/json',
        'X-CMC_PRO_API_KEY': process.env.VUE_APP_COIN_MARKET_CAP_API,
      },
      json: true
    }
    try {
      const response = await axios.request(options)
      let data = response.data.data
      let dataSorted = []
      let lengthData = data.length
      for (let i = 0; i < lengthData; i++) {
        dataSorted[i] = {
          id: data[i].id,
          name: {
            name: data[i].name,
            symbol: data[i].symbol
          },
          rank: data[i].cmc_rank,
          supply: {
            maxSupply: data[i].max_supply,
            circulatingSupply: data[i].circulating_supply,
            circulatingSupplyFriendlyFormat: this.abbrNum(data[i].circulating_supply, 2),
            totalSupply: data[i].total_supply,
          },
          percentageSupply: data[i].circulating_supply*100/data[i].max_supply,
          marketCap: {
            marketCap: data[i].quote.USD.market_cap,
            marketCapFriendlyFormat: this.abbrNum(data[i].quote.USD.market_cap, 2)
          },
          volumeOneDay: {
            volumeOneDay: data[i].quote.USD.volume_24h,
            volumeOneDayFriendlyFormat: this.abbrNum(data[i].quote.USD.volume_24h,2)
          },
          percentOneHour: data[i].quote.USD.percent_change_1h,
          percentOneDay: data[i].quote.USD.percent_change_24h,
          percentSevenDays: data[i].quote.USD.percent_change_7d,
          percentOneMonth: data[i].quote.USD.percent_change_30d,
          percentTwoMonths: data[i].quote.USD.percent_change_60d,
          percentThreeMonths: data[i].quote.USD.percent_change_90d,
          price: data[i].quote.USD.price
        }
        if (dataSorted[i].percentageSupply === Infinity) {
          dataSorted[i].percentageSupply = '-'
        } else {
          dataSorted[i].percentageSupply = dataSorted[i].percentageSupply.toFixed(2)
        }
      }
      localStorage.setItem('coinMarketCapData', JSON.stringify(dataSorted))
      localStorage.setItem('lastUpdate', new Date())
      localStorage.setItem('updateStateStatus', true)
      localStorage.setItem('updateStateError', 'No Error')
      return true
    } catch (error) {
      console.log(error)
      localStorage.setItem('updateStateStatus', false)
      localStorage.setItem('updateStateError', error)
      console.error(error)
      if (localStorage.getItem('coinMarketCapData') === null) {
        localStorage.setItem('coinMarketCapData', JSON.stringify(Offlinedata))
        localStorage.setItem('lastUpdate', new Date(2021, 7, 24, 15, 5, 0))
      }
      return false
    }
  },
  abbrNum: function (number, decPlaces) {
    decPlaces = Math.pow(10,decPlaces)
    let abbrev = [ " K", " M", " B", " t" ]
    for (let i=abbrev.length-1; i>=0; i--) {
      let size = Math.pow(10,(i+1)*3)
      if(size <= number) {
        number = Math.round(number*decPlaces/size)/decPlaces
        if((number === 1000) && (i < abbrev.length - 1)) {
          number = 1
          i++
        }
        number += abbrev[i]
        break;
      }
    }

    return number;
  }
}

export default service
