import helpers from './helpers'

const _ = require('lodash')

const lodash = {
  lodashCheck (data) {
    const dataSorted = []
    const lengthData = data.length
    for (let i = 0; i < lengthData; i++) {
      dataSorted[i] = {
        id: _.get(data, [i, 'id'], 'Not Found'),
        name: {
          name: _.get(data, [i, 'name'], 'Not Found'),
          symbol: _.get(data, [i, 'symbol'], 'Not Found')
        },
        rank: _.get(data, [i, 'cmc_rank'], 'Not Found'),
        supply: {
          maxSupply: _.get(data, [i, 'max_supply'], 'Not Found'),
          circulatingSupply: _.get(data, [i, 'circulating_supply'], 0),
          circulatingSupplyFriendlyFormat: helpers.abbrNum(_.get(data, [i, 'circulating_supply'], 'Not Found'), 2),
          totalSupply: _.get(data, [i, 'total_supply'], 'Not Found')
        },
        percentageSupply: {
          dataFetched: helpers.percentageDataFetched(_.get(data, [i, 'circulating_supply'], 0), _.get(data, [i, 'max_supply'], 0)),
          isSetMaximum: helpers.maxSupplyDefined(_.get(data, [i, 'max_supply'], 0)),
          percentage: _.get(data, [i, 'circulating_supply'], 0) * 100 / _.get(data, [i, 'max_supply'], 0)
        },
        marketCap: {
          marketCap: _.get(data, [i, 'quote', 'USD', 'market_cap'], 0),
          marketCapFriendlyFormat: helpers.abbrNum(_.get(data, [i, 'quote', 'USD', 'market_cap'], 'Not Found'), 2)
        },
        volumeOneDay: {
          volumeOneDay: _.get(data, [i, 'quote', 'USD', 'volume_24h'], 'Not Found'),
          volumeOneDayFriendlyFormat: helpers.abbrNum(_.get(data, [i, 'quote', 'USD', 'volume_24h'], 'Not Found'), 2)
        },
        percentOneHour: _.get(data, [i, 'quote', 'USD', 'percent_change_1h'], 'Not Found'),
        percentOneDay: _.get(data, [i, 'quote', 'USD', 'percent_change_24h'], 'Not Found'),
        percentSevenDays: _.get(data, [i, 'quote', 'USD', 'percent_change_7d'], 'Not Found'),
        percentOneMonth: _.get(data, [i, 'quote', 'USD', 'percent_change_30d'], 'Not Found'),
        percentTwoMonths: _.get(data, [i, 'quote', 'USD', 'percent_change_60d'], 'Not Found'),
        percentThreeMonths: _.get(data, [i, 'quote', 'USD', 'percent_change_90d'], 'Not Found'),
        price: _.get(data, [i, 'quote', 'USD', 'price'], 'Not Found')
      }
      if (dataSorted[i].percentageSupply.percentage === Infinity && !dataSorted[i].percentageSupply.isSetMaximum) {
        dataSorted[i].percentageSupply.percentage = 'Maximum Supply Not Defined'
      } else {
        dataSorted[i].percentageSupply.percentage = dataSorted[i].percentageSupply.percentage.toFixed(2)
      }
    }
    return dataSorted
  }
}

export default lodash
