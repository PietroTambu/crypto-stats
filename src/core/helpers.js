const helpers = {
  abbrNum: function (number, decPlaces) {
    if (isNaN(number)) { return 0 }
    decPlaces = Math.pow(10, decPlaces)
    const abbrev = [' K', ' M', ' B', ' t']
    for (let i = abbrev.length - 1; i >= 0; i--) {
      const size = Math.pow(10, (i + 1) * 3)
      if (size <= number) {
        number = Math.round(number * decPlaces / size) / decPlaces
        if ((number === 1000) && (i < abbrev.length - 1)) {
          number = 1
          i++
        }
        number += abbrev[i]
        break
      }
    }
    return number
  },
  maxSupplyDefined (maxSupply) {
    return (maxSupply !== 0 && maxSupply !== null)
  },
  percentageDataFetched (circulating, max) {
    return (circulating !== 0 && max !== 0)
  },
  formatNumber (number, toFixed, separateThousand = false) {
    return separateThousand ? number.toFixed(toFixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : number.toFixed(toFixed)
  }
}

export default helpers
