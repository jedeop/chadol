<template>
  <div class="video-list-item">
    <slot></slot>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class WindowListTemplate extends Vue {}
</script>

<style lang="less">
.video-list-item {
  border-radius: 10px;
  margin: 15px 0px;
  box-shadow: 0px 0px 15px -5px hsl(0, 0%, 80%);
  font-size: 18px;
  overflow: hidden;
  > *:not(.btn) {
    padding: 15px;
  }
  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    & *:first-child {
      margin-bottom: 5px;
    }
    &:hover {
      background-color: hsl(0, 0%, 90%);
    }
  }
}
</style>
