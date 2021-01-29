<template>
  <div id="app">
    <Uploader/>
  </div>
</template>

<script>
import Uploader from './components/Uploader/Uploader.vue'

export default {
  name: 'App',
  components: {
    Uploader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
