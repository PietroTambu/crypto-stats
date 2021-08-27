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
  }
}
</script>
