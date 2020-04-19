<template>
  <div id="app">
    <AppHeader />
    <WindowList :windows="windows" @create-window="createWindow"  @delete-window="deleteWindow" @edit-window="editWindow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AppHeader from '@/components/AppHeader.vue'
import WindowList from '@/components/WindowList.vue'
import { Window } from '@/types/window'
import Store from 'electron-store'
const store = new Store()

@Component({
  components: {
    AppHeader,
    WindowList
  }
})
export default class App extends Vue {
  private windows: Window[] = []

  generateID () {
    return Math.random().toString(36).substr(2, 9)
  };

  createWindow (url: string): void {
    this.windows.unshift({
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

  @Watch('windows', { deep: true })
  onWindowsUpdated (data: Window[]) {
    store.set('windows', data)
  }

  mounted () {
    this.windows = store.get('windows', [])
  }
}
</script>

<style lang="less">
html, body {
  margin: 0px;
  padding: 0px;
}
html {
  overflow-y: scroll;
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
