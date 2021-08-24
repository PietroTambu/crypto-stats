<template>
  <div>
    <b-row align-v="center">
      <b-col sm="8" class="p-2"><h2 class="m-0">Sync: {{ lastUpdate }}</h2></b-col>
      <b-col sm="3" align="center" class="p-2"><vs-button @click="updateData" warn gradient>Update</vs-button></b-col>
    </b-row>
    <b-table striped hover bordered
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
      <template #cell(name)="data">
        <div class="text-nowrap" v-if="widthDeviceCollapse">
          <b>{{ data.value.symbol }} </b>
          <b-icon-info-circle v-b-popover.hover.rightbottom="data.value.name + ', ' + data.value.symbol"></b-icon-info-circle>
        </div>
        <div class="text-nowrap" v-else>{{ data.value.name }}, <b>{{ data.value.symbol }}</b></div>
      </template>
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
        <span v-if="marketCapFormat" v-b-popover.hover.bottom.ds500="'$' + data.value.marketCap.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')">{{ '$' + data.value.marketCapFriendlyFormat }}</span>
        <span v-else>{{'$' + data.value.marketCap.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(volumeOneDay)="data">
        <span v-if="volumeOneDayFormat" v-b-popover.hover.bottom.ds500="'$' + data.value.volumeOneDay.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')">{{ '$' + data.value.volumeOneDayFriendlyFormat }}</span>
        <span v-else>{{ '$' + data.value.volumeOneDay.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(supply)="data">
        <span v-if="supplyFormat" v-b-popover.hover.bottom.ds500="'$' + data.value.circulatingSupply.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')">{{ data.value.circulatingSupplyFriendlyFormat }}</span>
        <span v-else>{{ data.value.circulatingSupply.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(percentageSupply)="data">
        <span v-if="!isNaN(data.value)">{{ data.value }} % </span>
        <span v-if="isNaN(data.value)"><b-icon-info-circle v-b-popover.hover.leftbottom="'Maximum supply not defined'"></b-icon-info-circle></span>
      </template>

      <template #head(name) v-if="!widthDeviceCollapse">
        <div class="text-nowrap">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search: Name"
            ></b-form-input>
          </b-input-group>
        </div>
      </template>
      <template #head(price)="data"><span class="text-nowrap">{{ data.label }}</span></template>
      <template #head(supply)="data">
        <div class="text-nowrap">{{ data.label }}
          <span class="btn-sm border border-white cursor-pointer changeButton" @click="supplyFormat = !supplyFormat">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </span>
        </div>
      </template>
      <template #head(volumeOneDay)="data">
        <div class="text-nowrap">{{ data.label }}
          <span class="btn-sm border border-white cursor-pointer changeButton" @click="volumeOneDayFormat = !volumeOneDayFormat">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </span>
        </div>
      </template>
      <template #head(marketCap)="data">
        <div class="text-nowrap">{{ data.label }}
          <span class="btn-sm border border-white cursor-pointer changeButton" @click="marketCapFormat = !marketCapFormat">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </span>
        </div>
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
        { key: 'name', label: 'Symbol', tdClass: 'align-middle', stickyColumn: true },
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
      filterOn: [],
      widthDeviceCollapse: false,
      loading: ''
    }
  },
  methods: {
    handleResizeChange () {
      if (window.innerWidth <= 425) {
        this.widthDeviceCollapse = true; this.filter = ''
      } else {
        this.widthDeviceCollapse = false
      }
    },
    handleOrientationChange () {
      const orientation = window.screen.orientation.type
      if (orientation === 'portrait-primary') {
        this.widthDeviceCollapse = true
        this.filter = ''
      } else if (orientation === 'landscape-primary') {
        this.widthDeviceCollapse = false
      }
    },
    async updateData () {
      this.$store.commit('overlayRequest')
      this.state = await service.axiosRequest()
      this.$store.commit('updateCoinMarketCap')
      this.$store.commit('updateStateData')
      this.$store.commit('overlayRequest')
    }
  },
  created () {
    this.loading = this.$vs.loading({
      background: '#2b2b2c',
      color: '#fff',
      type: 'circles'
    })
    window.innerWidth <= 425 ? this.widthDeviceCollapse = true : this.widthDeviceCollapse = false
  },
  async mounted () {
    this.loading.close()
    if (service.isMobile()) {
      window.addEventListener('orientationchange', this.handleOrientationChange)
    } else {
      window.addEventListener('resize', this.handleResizeChange)
    }
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
 .changeButton {
   background-color: #343a40;
   transition: background-color 0.3s;

 }
 .changeButton:hover {
   transition: background-color 0.5s;
   background-color: #4d5458;
 }
</style>
