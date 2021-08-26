<template>
  <div class="about">
    <Navbar :isActive="{ about: true }"/>
    <Header />
    <hr>
    <h5>Final project Front End by Pietro Tamburini for Start2Impact</h5>
    <ul class="text-start mx-auto" style="max-width: fit-content">
      <li>Single-page application</li>
      <li>Framework Vue.JS</li>
      <li>Google Firebase</li>
      <li>WebStorm IDE</li>
      <li>CoinMarketCap API</li>
      <li>Available on <a href="https://github.com/PietroTambu/crypto-stats" target="_blank" class="text-white">Github</a></li>
      <li>Visit my site at <a href="https://pietro-tamburini.it" class="text-white">pietro-tamburini.it</a></li>
    </ul>
  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'

export default {
  components: {
    Navbar,
    Header
  },
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
