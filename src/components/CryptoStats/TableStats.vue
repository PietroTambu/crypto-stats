<template>
  <div >
    <b-table id="table" class="text-center text-nowrap" striped hover responsive dark v-dragscroll
             :sticky-header="tableHeight"
             :items="coinMarketCapData"
             :fields="fields"
             :filter="filter"
             sort-direction="asc"
    >
      <template #head(name)="data">
        <div class="d-none d-sm-block">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search: Name"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block d-sm-none">{{data.label}}</div>
      </template>
      <template #head(supply)="data">
        <div>
          <span class="ms-1">{{data.label}}</span>
          <vs-button size="small" @click="dataFormat.circulatingSupply = !dataFormat.circulatingSupply" color="#6c757d" gradient class="d-inline-block">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </vs-button>
        </div>
      </template>
      <template #head(percentageSupply)="data">
        <span class="mx-2">{{data.label}}</span>
      </template>
      <template #head(volumeOneDay)="data">
        <div>
          <span class="ms-1">{{data.label}}</span>
          <vs-button size="small" @click="dataFormat.volumeOneDay = !dataFormat.volumeOneDay" color="#6c757d" gradient class="d-inline-block">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </vs-button>
        </div>
      </template>
      <template #head(marketCap)="data">
        <div>
          <span class="ms-1">{{data.label}}</span>
          <vs-button size="small" @click="dataFormat.marketCap = !dataFormat.marketCap" color="#6c757d" gradient class="d-inline-block">
            <b-icon-arrow-left-right></b-icon-arrow-left-right>
          </vs-button>
        </div>
      </template>
      <template #cell(name)="data">
        <div class="d-block d-sm-none">
          <b>{{data.value.symbol}} </b>
          <vs-tooltip dark right class="d-inline-block">
            <b-icon-info-circle></b-icon-info-circle>
            <template #tooltip>{{data.value.name}}, {{data.value.symbol}}
            </template>
          </vs-tooltip>
        </div>
        <div class="d-none d-sm-block">{{data.value.name}}, <b>{{data.value.symbol}}</b></div>
      </template>
      <template #cell(price)="data">
        <span class="mx-1" v-if="!isNaN(data.value)">${{formatNumber(data.value, 2, true)}}</span>
        <span class="mx-1" v-else>Not Found</span>
      </template>
      <template #cell(percentOneDay)="data">
        <span class="mx-1" v-if="isNaN(data.value)">Not Found</span>
        <span class="text-danger mx-1" v-else-if="data.value < 0">{{formatNumber(data.value, 4)}} %</span>
        <span class="text-success mx-1" v-else>+{{formatNumber(data.value, 4)}} %</span>
      </template>
      <template #cell(percentSevenDays)="data">
        <span class="mx-1" v-if="isNaN(data.value)">Not Found</span>
        <span class="text-danger" v-else-if="data.value < 0">{{data.value.toFixed(4)}} %</span>
        <span class="text-success" v-else>+{{data.value.toFixed(4)}} %</span>
      </template>
      <template #cell(marketCap)="data">
        <span v-if="dataFormat.marketCap && data.value.marketCap !== 0" v-b-popover.hover.bottom.ds500="`$${formatNumber(data.value.marketCap, 3, true)}`">${{data.value.marketCapFriendlyFormat}}</span>
        <span v-else-if="data.value.marketCap === 0" v-b-popover.hover.bottom.ds500="'Not Found'">Not Found</span>
        <span v-else>${{formatNumber(data.value.marketCap, 3, true)}}</span>
      </template>
      <template #cell(volumeOneDay)="data">
        <span v-if="dataFormat.volumeOneDay && data.value.volumeOneDay !== 0" v-b-popover.hover.bottom.ds500="`$${formatNumber(data.value.volumeOneDay, 3, true)}`">${{data.value.volumeOneDayFriendlyFormat}}</span>
        <span v-else-if="data.value.volumeOneDay === 0" v-b-popover.hover.bottom.ds500="'Not Found'">Not Found</span>
        <span v-else>${{formatNumber(data.value.volumeOneDay, 3, true)}}</span>
      </template>
      <template #cell(supply)="data">
        <span v-if="dataFormat.circulatingSupply && data.value.circulatingSupply !== 0" v-b-popover.hover.bottom.ds500="formatNumber(data.value.circulatingSupply, 3, true)">{{data.value.circulatingSupplyFriendlyFormat}}</span>
        <span v-else-if="data.value.circulatingSupply === 0" v-b-popover.hover.bottom.ds500="'Not Found'">Not Found</span>
        <span v-else>{{formatNumber(data.value.circulatingSupply, 2, true)}}</span>
      </template>
      <template #cell(percentageSupply)="data">
        <span v-if="data.value.dataFetched && data.value.isSetMaximum">{{data.value.percentage}} %</span>
        <span v-else-if="!data.value.dataFetched"> Not Found </span>
        <span v-else>
          <vs-tooltip dark bottom disabled>
            <vs-button color='#6c757d' size="small" gradient class="mx-auto my-0">
              <b-icon-info-circle></b-icon-info-circle>
            </vs-button>
            <template #tooltip>
              {{data.value.percentage}}
            </template>
          </vs-tooltip>
        </span>
      </template>
    </b-table>
  </div>
</template >

<script>
import service from '@/core/service'
import helpers from '@/core/helpers'

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
      loading: '',
      tableHeight: ''
    }
  },
  methods: {
    formatNumber (number, toFixed, separateThousand) {
      return helpers.formatNumber(number, toFixed, separateThousand)
    },
    resizeTableHeight () {
      const table = document.getElementById('table')
      if (window.innerHeight - table.offsetTop > 290) {
        this.tableHeight = String(window.innerHeight - table.offsetTop) + 'px'
      } else {
        this.tableHeight = '290px'
      }
    }
  },
  async mounted () {
    window.addEventListener('resize', this.resizeTableHeight)
    window.addEventListener('orientationchange', this.resizeTableHeight)
    this.resizeTableHeight()
    const table = document.getElementById('table')
    table.addEventListener('mousedown', () => { table.style.cursor = 'grab' })
    table.addEventListener('mouseup', () => { table.style.cursor = 'default' })
    this.$store.commit('overlayRequest')
    this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case 'updateCoinMarketCap':
          this.coinMarketCapData = this.$store.state.coinMarketCap
          break
        case 'resizeTable':
          this.resizeTableHeight()
      }
    })
    this.state = await service.axiosRequest()
    this.$store.commit('updateCoinMarketCap')
    this.$store.commit('updateStateData')
    this.$store.commit('overlayRequest')
  }
}
</script>
