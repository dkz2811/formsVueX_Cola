<template>
  <div id="app">
    <HeaderComp titulo="Entrega Vue Cli Forms"/>
    <RegisterComp />
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
import RegisterComp from './components/RegisterComp.vue';
export default {
  name: 'App',
  components: {
    HeaderComp,
    RegisterComp,
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
