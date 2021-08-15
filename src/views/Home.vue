<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="!state">
        Unlock the temporarily access to Cross-Origin Resource Sharing: <a href="https://cors-anywhere.herokuapp.com/" target="_blank">CORS Anywhere</a>
        <br> Once enable: <u onclick="location.reload()" class="text-primary" style="cursor: pointer">Reload</u> | {{ error }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <CryptoStats />
    </b-overlay>
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
      state: this.$store.state.updateState.status,
      error: this.$store.state.updateState.error,
      show: true
    }
  },
  async mounted () {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'updateStateData':
          this.state = this.$store.state.updateState.status
          this.error = this.$store.state.updateState.error
          this.show = true
          break
        case 'overlayRequest':
          this.show = this.$store.state.show
          break
      }
    })
  }
}
</script>
