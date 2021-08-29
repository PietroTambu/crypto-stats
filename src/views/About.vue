<template>
  <div class="h-100 text-center">
    <Navbar :isActive="{ about: true }"/>
    <Header />
    <hr>
    <h5>Final project Front End by Pietro Tamburini for Start2Impact</h5>
    <ul class="text-start mx-auto unordered-list">
      <li>Powered by <a href="https://vuejs.org/" target="_blank" class="text-white">Vue.js</a></li>
      <li>API Data from <a href="https://coinmarketcap.com/" target="_blank" class="text-white">CoinMarketCap</a></li>
      <li>Available on <a href="https://github.com/PietroTambu/crypto-stats" target="_blank" class="text-white">Github</a></li>
      <li>Visit my site: <a href="https://pietro-tamburini.it" target="_blank" class="text-white">pietro-tamburini.it</a></li>
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
  }
}
</script>
