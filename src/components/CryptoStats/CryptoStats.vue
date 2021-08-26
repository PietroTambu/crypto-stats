<template>
  <div>
    <UpdateStats />
    <TableStats />
  </div>
</template>

<script>
import UpdateStats from './UpdateStats'
import TableStats from './TableStats'

export default {
  name: 'CryptoStats',
  components: {
    UpdateStats,
    TableStats
  },
  data: function () {
    return {
      loading: ''
    }
  },
  created () {
    this.loading = this.$vs.loading({
      background: '#2b2b2c',
      color: '#fff',
      type: 'circles'
    })
  },
  mounted () {
    this.loading.close()
  }
}
</script>
