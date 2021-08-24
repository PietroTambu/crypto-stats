<template>
  <div>
    <vs-alert :hidden="!show" color='danger' class="mb-3 text-start">
      <template #title>
        Failed to fetch Data
      </template>
      Try:
      <ol>
        <li>Unlock the temporarily access to Cross-Origin Resource Sharing: <a href="https://cors-anywhere.herokuapp.com/" target="_blank">CORS Anywhere</a></li>
        <li>Once enable: <a onclick="location.reload()" class="text-primary" style="cursor: pointer">Reload</a></li>
      </ol>
      <b>{{ error }}</b>
    </vs-alert>
    <CryptoStats />
  </div>
</template>

<script>
import CryptoStats from '@/components/CryptoStats.vue'

export default {
  name: 'Home',
  components: {
    CryptoStats
  },
  data: function () {
    return {
      error: this.$store.state.updateState.error,
      show: false,
      loading: ''
    }
  },
  async mounted () {
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
