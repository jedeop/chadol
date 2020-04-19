<template>
  <WindowListTemplate :class="{ setting: isSetting }">
    <div class="info">
      <div class="title" v-show="!isSetting">
        {{ window.name }}
      </div>
      <div class="title" v-show="isSetting">
        <input type="text" v-model="newName">
      </div>
      <div class="desc" v-show="!isSetting">
        {{ window.url }}
      </div>
      <div class="opacity" v-show="isSetting">
        <label :for="`opacity${window.id}`">투명도</label>
        <input type="range" min="30" max="100" :id="`opacity${window.id}`" v-model="newOpacity">
      </div>
    </div>

    <div class="setting btn" @click="toggleSetting" v-show="!isSetting">
      <font-awesome-icon :icon="['fas', 'wrench']" />
      설정
    </div>
    <div class="open btn" @click="openWindow" v-show="!isSetting">
      <font-awesome-icon :icon="['fas', 'external-link-alt']" />
      열기
    </div>

    <div class="delete btn" @click="deleteWindow" v-show="isSetting">
      <font-awesome-icon :icon="['fas', 'trash']" />
      삭제
    </div>
    <div class="calcel btn" @click="toggleSetting" v-show="isSetting">
      <font-awesome-icon :icon="['fas', 'times']" />
      취소
    </div>
    <div class="save btn" @click="editWindow" v-show="isSetting">
      <font-awesome-icon :icon="['fas', 'check']" />
      저장
    </div>
  </WindowListTemplate>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import WindowListTemplate from '@/components/WindowListTemplate.vue'
import { Window } from '@/types/window'
import { remote } from 'electron'
import path from 'path'
const { BrowserWindow } = remote

@Component({
  components: {
    WindowListTemplate
  }
})
export default class WindowListItem extends Vue {
  @Prop() private window!: Window;
  @Prop() private appDir!: string;
  private instance: Electron.BrowserWindow | null = null;
  private isSetting = false;
  private newName = '';
  private newOpacity = 100;

  openWindow (): void {
    if (!this.appDir) return
    if (!this.instance) {
      this.instance = new BrowserWindow({
        width: 640,
        height: 360,
        frame: false,
        title: this.window.name,
        webPreferences: {
          preload: path.join(this.appDir, 'preload.js')
        },
        alwaysOnTop: true
      })
      this.instance.on('close', () => { this.instance = null })
      this.instance.loadURL(this.window.url)
      const instance = this.instance
      this.instance.webContents.once('dom-ready', () => {
        instance.webContents.send('ready')
      })
      this.instance.setOpacity(this.window.opacity / 100)
    }
    this.instance.show()
  }

  toggleSetting (): void {
    this.isSetting = !this.isSetting
    if (this.isSetting) {
      this.newName = this.window.name
      this.newOpacity = this.window.opacity
    } else {
      this.newName = ''
    }
  }

  deleteWindow () {
    if (this.instance) {
      this.instance.close()
    }
    this.$emit('delete-window')
  }

  editWindow () {
    this.$emit('edit-window', { name: this.newName, opacity: this.newOpacity })
    this.toggleSetting()
  }
}
</script>

<style lang="less">
.video-list-item {
  text-align: left;
  display: flex;
  align-items: stretch;

  .info {
    padding-right: 10px;
    flex-basis: 70%;
    input {
      margin: 0px;
      margin-bottom: -4px;
      padding-bottom: 2px;
    }
    .title input {
      font-size: 18px;
    }
  }
  .title {
    font-weight: 400;
    margin: 0px;
    margin-bottom: 5px;
  }
  .desc {
    color: gray;
    font-size: 13px;
    word-break: break-all;
  }
  .opacity {
    font-size: 14px;
    display: flex;
    align-items: stretch;
    margin-top: 8px;
    input {
      width: auto;
      margin: auto;
      margin-left: 10px;
      flex-grow: 1;
      appearance: none;
      background-color: hsl(0, 0%, 80%);
      height: 4px;
      &::-webkit-slider-thumb {
        appearance: none;
        border-radius: 50%;
        width: 13px;
        height: 13px;
        background-color: hsl(0, 0%, 75%);
        &:hover {
          background-color: hsl(0, 0%, 60%);
        }
      }
    }
  }
  .btn {
    &.setting {
      margin-left: auto;
    }
    flex-basis: 15%;
    &.delete {
      color: rgb(255, 70, 37);
    }
  }
  &.setting .btn {
    flex-basis: 10%;
  }
}
</style>
