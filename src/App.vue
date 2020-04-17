<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@/components/AppHeader.vue'

@Component({
  components: {
    AppHeader
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
html, body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Mapo한아름';
  text-align: center;
  .btn {
    cursor: pointer;
  }
}
</style>
