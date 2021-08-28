<template>
  <div>
    <Navbar :isActive="{ home: true }" />
    <Header />
    <vs-alert :hidden="!show" color='danger' class="mb-3 text-start">
      <template #title>Failed to fetch Data</template>
      <b>{{ error }}</b>
    </vs-alert>
    <CryptoStats />
  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import CryptoStats from '@/components/CryptoStats/CryptoStats.vue'

export default {
  name: 'Home',
  components: {
    CryptoStats,
    Navbar,
    Header
  },
  data: function () {
    return {
      error: this.$store.state.updateState.error,
      show: false,
      loading: ''
    }
  },
  beforeMount () {
    this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case 'updateStateData':
          this.error = this.$store.state.updateState.error
          this.show = !this.$store.state.updateState.status
          break
        case 'overlayRequest':
          if (this.$store.state.loading) {
            this.loading = this.$vs.loading({
              background: '#2b2b2c',
              color: '#fff',
              type: 'circles'
            })
          } else {
            this.loading.close()
          }
          break
      }
    })
  }
}
</script>
