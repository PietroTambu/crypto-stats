<template>
  <div>
    <b-button  @click="myFunction" class="btn-success">Get Data</b-button>
    <h1>{{ axiosData }}</h1>
  </div>
</template>

<script>
import service from '../js/service'
export default {
  name: 'CryptoStats',
  data: function () {
    return {
      axiosData: {}
    }
  },
  methods: {
    myFunction () {
      this.axiosData = service.axiosRequest()
    }
  }
}
</script>

<style scoped>

</style>
