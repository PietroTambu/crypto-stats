<template>
  <div>
    <Navbar :isActive="{ error: true}" />
    <Header />
    <hr>
    <h1 class="text-center mt-5">404 Not Found...</h1>
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
