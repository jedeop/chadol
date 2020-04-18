<template>
  <div class="video-list">
    <WindowListItem v-for="(window, index) in windows" :key="window.id" :window="window" :app-dir="appDir" @delete-window="deleteWindow(index)" @edit-window="editWindow($event, index)"/>
    <WindowListTemplate class="createWindow btn">
      <div class="btn add" v-show="!creatingWindow" @click="createWindow">
        <font-awesome-icon :icon="['fas', 'plus']" />
        추가하기
      </div>
      <div class="url" v-show="creatingWindow">
        <input type="text" placeholder="URL을 입력하세요" v-model="newUrl">
        <div class="btn calcel" @click="clearCreatingWindow">
          <font-awesome-icon :icon="['fas', 'times']" />
          취소
        </div>
        <div class="btn add_comfirm" @click="createWindowConfirm">
          <font-awesome-icon :icon="['fas', 'plus']" />
          추가
        </div>
      </div>
    </WindowListTemplate>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import WindowListItem from '@/components/WindowListItem.vue'
import WindowListTemplate from '@/components/WindowListTemplate.vue'
import { Window } from '@/types/window'
import { ipcRenderer, clipboard } from 'electron'

@Component({
  components: {
    WindowListItem,
    WindowListTemplate
  }
})
export default class WindowList extends Vue {
  @Prop() private windows!: Window[];
  private appDir: string | null = null;
  private creatingWindow = false;
  private newUrl = '';

  isYoutube (str: string): boolean {
    const url = new RegExp('(http://|https://)(www.)?youtube.com/.+', 'i')
    return str.length < 2083 && url.test(str)
  }

  createWindow (): void {
    this.creatingWindow = true
    const clipboardTxt = clipboard.readText()
    if (clipboardTxt && this.isYoutube(clipboardTxt)) {
      this.newUrl = clipboardTxt
    }
  }

  clearCreatingWindow (): void {
    this.creatingWindow = false
    this.newUrl = ''
  }

  createWindowConfirm (): void {
    if (this.newUrl && this.isYoutube(this.newUrl)) {
      this.$emit('create-window', this.newUrl)
      this.clearCreatingWindow()
    }
  }

  deleteWindow (index: number): void {
    this.$emit('delete-window', index)
  }

  editWindow (name: string, index: number): void {
    this.$emit('edit-window', index, name)
  }

  created () {
    ipcRenderer.send('app dir req')
    ipcRenderer.on('app dir res', (event, dir) => {
      this.appDir = dir
    })
  }
}
</script>

<style lang="less">
.video-list {
  display: flex;
  align-items: center;
  flex-direction: column;

  .createWindow {
    display: flex;
    justify-content: center;
    .btn {
      &.add {
        padding: 15px;
        flex-basis: 100%;
      }
    }
    .url {
      display: flex;
      align-items: stretch;
      width: 100%;
      padding: 0px;
      > * {
        padding: 15px;
      }
      .btn  {
        flex-basis: 10%;
      }
      input {
        flex-basis: 80%;
        padding: 0px;
      }
    }
  }
  input {
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
    font-size: 15px;
    width: 100%;
    margin: 15px;
  }
}
</style>
