<template>
  <div id="app">
    <AppHeader />
    <WindowList :windows="windows" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@/components/AppHeader.vue'
import WindowList from '@/components/WindowList.vue'
import { Window } from '@/types/window'

@Component({
  components: {
    AppHeader,
    WindowList
  }
})
export default class App extends Vue {
  private windows: Window[] = [{
    id: 1,
    name: '첫번째 창',
    desc: '첫번째 창 설명'
  }, {
    id: 2,
    name: '두번째 창',
    desc: '두번째 창 설명'
  }]
}
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
