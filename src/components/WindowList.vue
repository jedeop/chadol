<template>
  <div class="video-list">
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
    <transition-group name="window-list" tag="div">
      <WindowListItem v-for="(window, index) in windows" :key="window.id" :window="window" :app-dir="appDir" @delete-window="deleteWindow(index)" @edit-window="editWindow($event, index)"/>
    </transition-group>
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

  > div, .createWindow {
    width: 50%;
    @media (max-width: 600px) {
      width: 75%;
    }
  }
  .createWindow {
    display: flex;
    justify-content: center;
    margin: 0px;
    .btn {
      &.add {
        padding: 15px;
        flex-basis: 100%;
        flex-direction: row;
        > *:first-child {
          margin-bottom: 0px;
          margin-right: 5px;
        }
      }
    }
    .url {
      display: flex;
      align-items: stretch;
      width: 100%;
      padding: 0px;
      > * {
        padding: 10px;
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
    margin: 10px;
  }
}
.video-list-item {
  transition: all .5s ease;
}
.window-list-enter, .window-list-leave-to {
  opacity: 0;
}
.window-list-enter-active {
  transition: opacity .5s ease .3s;
}
.window-list-leave-active {
  transition: opacity .5s ease 0s;
  position: absolute;
  margin: 0px;
  &:first-of-type {
    margin-top: 15px;
  }
  width: 50%;
  @media (max-width: 600px) {
    width: 75%;
  }
}
</style>
