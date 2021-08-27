<template>
  <div class="text-center mt-3">
    <h1 class="display-5 text-white metropolis-bold">
      Crypto Stats<b-img class="d-sm-none pb-1" width="45" height="40" :src="getImage('Crypto-Stats-Logo', 'png')" alt="Crypto stats logo"></b-img>
    </h1>
    <h1 class="display-6 text-white metropolis-bold px-2 d-none d-sm-block">
      Crypto<span class="opacity-25">currencies</span> Stat<span class="opacity-25">istic</span>s
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    getImage (name, extension) {
      return require(`@/assets/${name}.${extension}`)
    }
  }
}
</script>
