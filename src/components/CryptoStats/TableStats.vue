<template>
  <div>
    <b-table class="text-center" striped hover bordered responsive dark
        :items="coinMarketCapData"
        :fields="fields"
        :filter="filter"
        sort-direction="asc"
    >
      <template #head(name)="data">
        <div class="text-nowrap d-none d-sm-block">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search: Name"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="text-nowrap d-block d-sm-none"> {{ data.label }} </div>
      </template>
      <template #head(price)="data">
        <span class="text-nowrap">{{ data.label }}</span>
      </template>
      <template #head(supply)="data">
        <div class="text-nowrap">
          <span class="ms-1">{{ data.label }}</span>
          <vs-button size="small" @click="dataFormat.circulatingSupply = !dataFormat.circulatingSupply" color="#6c757d" gradient class="d-inline-block">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </vs-button>
        </div>
      </template>
      <template #head(volumeOneDay)="data">
        <div class="text-nowrap">
          <span class="ms-1">{{ data.label }}</span>
          <vs-button size="small" @click="dataFormat.volumeOneDay = !dataFormat.volumeOneDay" color="#6c757d" gradient class="d-inline-block">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </vs-button>
        </div>
      </template>
      <template #head(marketCap)="data">
        <div class="text-nowrap">
          <span class="ms-1">{{ data.label }}</span>
          <vs-button size="small" @click="dataFormat.marketCap = !dataFormat.marketCap" color="#6c757d" gradient class="d-inline-block">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </vs-button>
        </div>
      </template>
      <template #head(percentageSupply)="data">
        <div class="text-nowrap">{{ data.label }}</div>
      </template>
      <template #cell(name)="data">
        <div class="text-nowrap d-block d-sm-none">
          <b>{{ data.value.symbol }} </b>
          <vs-tooltip dark right class="d-inline-block">
            <b-icon-info-circle></b-icon-info-circle>
            <template #tooltip>
              {{ data.value.name + ', ' + data.value.symbol }}
            </template>
          </vs-tooltip>
        </div>
        <div class="text-nowrap d-none d-sm-block">{{ data.value.name }}, <b>{{ data.value.symbol }}</b></div>
      </template>
      <template #cell(price)="data">
        {{ '$' + data.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </template>
      <template #cell(percentOneDay)="data">
        <span class="text-danger" v-if="data.value < 0">{{ data.value.toFixed(4) + '%' }}</span>
        <span class="text-success" v-if="data.value > 0">{{ '+' + data.value.toFixed(4) + '%' }}</span>
      </template>
      <template #cell(percentSevenDays)="data">
        <span class="text-danger" v-if="data.value < 0">{{ data.value.toFixed(4) + '%' }}</span>
        <span class="text-success" v-if="data.value > 0">{{ '+' + data.value.toFixed(4) + '%' }}</span>
      </template>
      <template #cell(marketCap)="data">
        <span v-if="dataFormat.marketCap" v-b-popover.hover.bottom.ds500="'$' + data.value.marketCap.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')">{{ '$' + data.value.marketCapFriendlyFormat }}</span>
        <span v-else>{{'$' + data.value.marketCap.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(volumeOneDay)="data">
        <span v-if="dataFormat.volumeOneDay" v-b-popover.hover.bottom.ds500="'$' + data.value.volumeOneDay.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')">{{ '$' + data.value.volumeOneDayFriendlyFormat }}</span>
        <span v-else>{{ '$' + data.value.volumeOneDay.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(supply)="data">
        <span v-if="dataFormat.circulatingSupply" v-b-popover.hover.bottom.ds500="'$' + data.value.circulatingSupply.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')">{{ data.value.circulatingSupplyFriendlyFormat }}</span>
        <span v-else>{{ data.value.circulatingSupply.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template #cell(percentageSupply)="data">
        <span v-if="!isNaN(data.value)">{{ data.value }} % </span>
        <span v-if="isNaN(data.value)">
          <vs-tooltip dark bottom disabled>
            <vs-button color='#6c757d' size="small" gradient class="mx-auto my-0">
              <b-icon-info-circle></b-icon-info-circle>
            </vs-button>
            <template #tooltip>
              Maximum supply not defined
            </template>
          </vs-tooltip>
        </span>
      </template>
    </b-table>
  </div>
</template >

<script>
import service from '@/core/service'

export default {
  name: 'TableStats',
  data: function () {
    return {
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
      dataFormat: {
        marketCap: true,
        volumeOneDay: true,
        circulatingSupply: true
      },
      coinMarketCapData: this.$store.state.coinMarketCap,
      state: false,
      filter: '',
      loading: ''
    }
  },
  async mounted () {
    this.$store.commit('overlayRequest')
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'updateCoinMarketCap':
          this.coinMarketCapData = this.$store.state.coinMarketCap
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
