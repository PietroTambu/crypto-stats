/* eslint-disable */
// noinspection JSUnresolvedVariable
import Offlinedata from '../assets/OfflineData.json'

const axios = require('axios')

const service = {
  async axiosRequest () {
    const options = {
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        'start': 1,
        'limit': 5000,
        'convert': 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.VUE_APP_COIN_MARKET_CAP_API
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
  },
  isMobile: function () {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

}

export default service
