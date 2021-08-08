<template>
  <div class="home">
    <CryptoStats />
  </div>
</template>

<script>
import CryptoStats from '@/components/CryptoStats.vue'

export default {
  name: 'Home',
  components: {
    CryptoStats
  }
}
</script>
