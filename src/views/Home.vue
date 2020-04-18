<template>
  <div class="home">
    <WindowList :windows="windows" @create-window="createWindow"  @delete-window="deleteWindow" @edit-window="editWindow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WindowList from '@/components/WindowList.vue'
import { Window } from '@/types/window'
import Store from 'electron-store'
const store = new Store()

@Component({
  components: {
    WindowList
  }
})
export default class App extends Vue {
  get windows (): Window[] {
    return store.get('windows', [])
  }

  set windows (windowsInput: Window[]) {
    store.set('windows', windowsInput)
  }

  generateID () {
    return Math.random().toString(36).substr(2, 9)
  };

  createWindow (url: string): void {
    this.windows.push({
      id: this.generateID(),
      name: '영상',
      url
    })
  }

  deleteWindow (index: number): void {
    this.windows.splice(index, 1)
  }

  editWindow (index: number, name: string): void {
    this.windows[index].name = name
  }
}
</script>

<style lang="less">

</style>
