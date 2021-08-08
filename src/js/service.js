/* eslint-disable */
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
        'X-CMC_PRO_API_KEY': 'de386a39-93c0-4af8-8529-636184b2a243'
      },
      json: true
    }

    try {
      const response = await axios.request(options)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return { report: false, info: error }
    }
  },
  anotherFunction: function (param) {
    const result = 1
    return result
  }
}

export default service
