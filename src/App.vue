<!--suppress ALL -->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: Metropolis-Bold;
  src: url("./fonts/Metropolis-Bold.otf");
}
body {
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d5d5d5;
  background-color: #343a40;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #d5d5d5;

    &.router-link-exact-active {
      color: #f2a900;
    }
  }
}
</style>
