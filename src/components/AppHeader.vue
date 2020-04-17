<template>
  <header>
    <div>Always On Top</div>
    <h1>차돌 영상 플레이어</h1>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppHeader extends Vue {

}
</script>

<style lang="less">
header {
  margin-bottom: 5px;
  padding: 10px;
  h1 {
    margin: 0px;
  }
  div {
    font-size: 23px;
  }
}
</style>
