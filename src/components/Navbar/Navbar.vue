<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/" class="position-absolute d-none d-sm-block">
        <b-img height="40" width="50" :src="getImage('Crypto-Stats-Logo', 'png')" alt="Crypto stats logo"></b-img>
        Crypto Stats
      </b-navbar-brand>
      <b-navbar-nav class="mx-auto">
        <b-nav-item to="/" :active="isActive.home">Home</b-nav-item>
        <b-nav-item to="/about" :active="isActive.about">About</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Object
  },
  name: 'Header',
  methods: {
    getImage (name, extension) {
      return require(`@/assets/${name}.${extension}`)
    }
  }
}
</script>
<style src="./Navbar.scss" lang="scss"></style>
