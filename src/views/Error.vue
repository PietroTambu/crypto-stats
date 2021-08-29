<template>
  <div>
    <Navbar :isActive="{ error: true}" />
    <Header />
    <hr>
    <h1 class="text-center mt-5">404. <span class="text-white-50">That's an error</span></h1>
    <h3 class="text-center mt-5">The requested URL <u>{{ this.$route.fullPath }}</u> was not found on this server.</h3>
  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'

export default {
  name: 'Error',
  components: {
    Navbar,
    Header
  }
}
</script>
