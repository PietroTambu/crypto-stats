<template>
  <div>
    <h1 class="text-center">{{ this.lastUpdate }}    <small>Syncronized:</small> {{ this.state }}</h1>
    <b-table striped hover :items="coinMarketCapData" :fields="fields" :dark="true" :responsive="true">
      <template #cell(name)="data">{{ data.value.name }}, <b>{{ data.value.symbol }}</b></template>
      <template #cell(price)="data">{{ '$' + data.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</template>
      <template #cell(percentOneDay)="data">
        <span class="text-danger" v-if="data.value < 0">{{ data.value.toFixed(4) + '%' }}</span>
        <span class="text-success" v-if="data.value > 0">{{ '+' + data.value.toFixed(4) + '%' }}</span>
      </template>
      <template #cell(percentSevenDays)="data">
        <span class="text-danger" v-if="data.value < 0">{{ data.value.toFixed(4) + '%' }}</span>
        <span class="text-success" v-if="data.value > 0">{{ '+' + data.value.toFixed(4) + '%' }}</span>
      </template>
      <template #cell(marketCap)="data">
        <span v-if="marketCapFormat">{{'$' + data.value.marketCapFriendlyFormat }}</span>
        <span v-else>{{'$' + data.value.marketCap.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(volumeOneDay)="data">
        <span v-if="volumeOneDayFormat">{{ '$' + data.value.volumeOneDayFriendlyFormat }}</span>
        <span v-else>{{ '$' + data.value.volumeOneDay.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(supply)="data">
        <span v-if="supplyFormat">{{ data.value.circulatingSupplyFriendlyFormat }}</span>
        <span v-else>{{ data.value.circulatingSupply.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(percentageSupply)="data">
        <span v-if="!isNaN(data.value)">{{ data.value }} % </span>
        <span v-if="isNaN(data.value)"><b-icon-info-circle v-b-popover.hover.bottom="'Maximum supply not defined'"></b-icon-info-circle></span>
      </template>

      <template #head(supply)="data">
        <span @click="supplyFormat = !supplyFormat" class="cursor-pointer">{{ data.label }} <b-icon-arrow-left-right></b-icon-arrow-left-right></span>
      </template>
      <template #head(volumeOneDay)="data">
        <span @click="volumeOneDayFormat = !volumeOneDayFormat" class="cursor-pointer">{{ data.label }} <b-icon-arrow-left-right></b-icon-arrow-left-right></span>
      </template>
      <template #head(marketCap)="data">
        <span @click="marketCapFormat = !marketCapFormat" class="cursor-pointer">{{ data.label }} <b-icon-arrow-left-right></b-icon-arrow-left-right></span>
      </template>
    </b-table>
  </div>
</template>

<script>
import service from '../js/service'
export default {
  name: 'CryptoStats',
  data: function () {
    return {
      marketCapFormat: true,
      volumeOneDayFormat: true,
      supplyFormat: true,
      fields: [
        { key: 'id', label: 'ID', tdClass: 'align-middle' },
        { key: 'name', label: 'Name', tdClass: 'align-middle' },
        { key: 'price', label: 'USD price', tdClass: 'align-middle' },
        { key: 'percentOneDay', label: '24h %', tdClass: 'align-middle' },
        { key: 'percentSevenDays', label: '7d %', tdClass: 'align-middle' },
        { key: 'marketCap', label: 'Market Cap', tdClass: 'align-middle' },
        { key: 'volumeOneDay', label: 'Volume (24h)', tdClass: 'align-middle' },
        { key: 'supply', label: 'Circulating Supply', tdClass: 'align-middle' },
        { key: 'percentageSupply', label: 'Circulating Supply %', tdClass: 'align-middle' }
      ],
      coinMarketCapData: this.$store.state.coinMarketCap,
      state: false,
      lastUpdate: ''
    }
  },
  async mounted () {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'updateCoinMarketCap':
          this.coinMarketCapData = this.$store.state.coinMarketCap
          this.lastUpdate = this.$store.state.lastUpdate
          break
      }
    })
    this.state = await service.axiosRequest()
    this.$store.commit('updateCoinMarketCap')
  }
}
</script>

<style scoped>
 .cursor-pointer {
   cursor: pointer
 }
</style>
