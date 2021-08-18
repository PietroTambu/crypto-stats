<template>
  <div class="about">
    <h1>Crypto - Stats<b-img width="50" src="./favicon.ico"></b-img></h1>
    <h2>Crypto<span class="text-secondary">currency</span> Stat<span class="text-secondary">istic</span>s</h2>
    <small>API by <a href="https://coinmarketcap.com/" target="_blank" class="text-white">CoinMarketCap</a></small>
    <hr>
    <h5>Final project Front End by Pietro Tamburini for Start2Impact</h5>
    <ul class="text-start mx-auto" style="max-width: fit-content">
      <li>Single-page application</li>
      <li>Framework Vue.JS</li>
      <li>Google Firebase</li>
      <li>WebStorm IDE</li>
      <li>CoinMarketCap API</li>
      <li class="text-secondary">Available on <a href="https://github.com/PietroTambu/crypto-stats" target="_blank" class="text-white">Github</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainProps: { width: 75 }
    }
  }
}
</script>

<style scoped>
.about {
  height: 100vh
}
</style>
