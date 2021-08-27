<template>
  <div>
    <b-row align-v="center" class="mw-100 m-0">
      <b-col sm="8" align="center" class="p-2">
        <p class="display-6 text-center text-white-50 m-0">Sync: {{ this.$store.state.lastUpdate }}</p>
      </b-col>
      <b-col sm="3" align="center" class="p-2">
        <vs-button @click="updateData" size="large" warn gradient>Update <b-img height="30" :src="getImage('Crypto-Stats-Logo', 'png')" alt="Crypto stats logo"></b-img></vs-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import service from '@/core/service'

export default {
  name: 'UpdateStats',
  methods: {
    async updateData () {
      this.$store.commit('overlayRequest')
      this.state = await service.axiosRequest()
      this.$store.commit('updateCoinMarketCap')
      this.$store.commit('updateStateData')
      this.$store.commit('overlayRequest')
    },
    getImage (name, extension) {
      return require(`@/assets/${name}.${extension}`)
    }
  }
}
</script>
