<template>
  <div>
    <h1 class="text-center">{{ this.lastUpdate }}</h1>
    <b-form-group
      label="Filter"
      label-for="filter-input"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
      class="mb-0"
    >
      <b-input-group size="sm">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-table striped hover
             :items="coinMarketCapData"
             :fields="fields"
             :dark="true"
             :responsive="true"
             :filter="filter"
             :filter-included-fields="filterOn"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
    >
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
        <span v-if="marketCapFormat">{{ '$' + data.value.marketCapFriendlyFormat }}</span>
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
        <span v-if="isNaN(data.value)"><b-icon-info-circle v-b-popover.hover.leftbottom="'Maximum supply not defined'"></b-icon-info-circle></span>
      </template>

      <template #head(supply)="data">
        <div @click="supplyFormat = !supplyFormat" class="cursor-pointer text-nowrap">{{ data.label }} <b-icon-arrow-left-right></b-icon-arrow-left-right></div>
      </template>
      <template #head(volumeOneDay)="data">
        <div @click="volumeOneDayFormat = !volumeOneDayFormat" class="cursor-pointer text-nowrap">{{ data.label }} <b-icon-arrow-left-right></b-icon-arrow-left-right></div>
      </template>
      <template #head(marketCap)="data">
        <div @click="marketCapFormat = !marketCapFormat" class="cursor-pointer text-nowrap">{{ data.label }} <b-icon-arrow-left-right></b-icon-arrow-left-right></div>
      </template>
      <template #head(percentageSupply)="data">
        <div class="text-nowrap">{{ data.label }}</div>
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
        { key: 'name', label: 'Name', tdClass: 'align-middle', stickyColumn: true, sortable: true },
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
      lastUpdate: '',
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
    }
  },
  async mounted () {
    this.$store.commit('overlayRequest')
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
    this.$store.commit('updateStateData')
    this.$store.commit('overlayRequest')
  }
}
</script>

<style scoped>
 .cursor-pointer {
   cursor: pointer
 }
</style>
