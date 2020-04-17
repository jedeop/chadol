<template>
  <div class="home">
    <WindowList :windows="windows" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WindowList from '@/components/WindowList.vue'
import { Window } from '@/types/window'

@Component({
  components: {
    WindowList
  }
})
export default class App extends Vue {
  private windows: Window[] = [{
    id: 1,
    name: '매직카펫라이드 - 티키틱',
    desc: '첫번째 창 설명',
    url: 'https://www.youtube.com/watch?v=BN3WvuoDN1o'
  }, {
    id: 2,
    name: '팔면좋겠다 - 티키틱',
    desc: '두번째 창 설명',
    url: 'https://www.youtube.com/watch?v=l344cbmYGmU'
  }]
}
</script>

<style lang="less">

</style>
