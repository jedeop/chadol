<template>
  <div class="video-list">
    <WindowListItem v-for="window in windows" :key="window.id" :window="window" :app-dir="appDir" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import WindowListItem from '@/components/WindowListItem.vue'
import { Window } from '@/types/window'
import { ipcRenderer } from 'electron'

@Component({
  components: {
    WindowListItem
  }
})
export default class WindowList extends Vue {
  @Prop() private windows!: Window[];
  private appDir: string | null = null

  created () {
    ipcRenderer.send('app dir req')
    ipcRenderer.on('app dir res', (event, dir) => {
      this.appDir = dir
    })
  }
}
</script>

<style>
.video-list {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
