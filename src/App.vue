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
* {
  font-family: 'Mapo한아름';
}
#app {
  text-align: center;
  .btn {
    cursor: pointer;
  }
  margin-bottom: 20px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 70%, 0.5);
}

::-webkit-scrollbar-thumb:hover {
  background: hsla(0, 0%, 70%, 0.8);
}
</style>
