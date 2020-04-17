<template>
  <div class="video-list-item">
    <div class="info">
      <div class="title">{{ window.name }}</div>
      <div class="desc">
        {{ window.desc }}
      </div>
    </div>
    <div class="setting btn">
      <font-awesome-icon :icon="['fas', 'wrench']" />
      설정
    </div>
    <div class="open btn" @click="openWindow">
      <font-awesome-icon :icon="['fas', 'external-link-alt']" />
      열기
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Window } from '@/types/window'
import { remote } from 'electron'
import path from 'path'
const { BrowserWindow } = remote

@Component
export default class WindowListItem extends Vue {
  @Prop() private window!: Window;
  @Prop() private appDir!: string;
  private instance: Electron.BrowserWindow | null = null;

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
    }
    this.instance.show()
  }
}
</script>

<style lang="less">
.video-list-item {
  border-radius: 10px;
  margin: 15px;
  box-shadow: 0px 0px 15px -5px hsl(0, 0%, 80%);
  text-align: left;
  font-size: 18px;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 50%;
  @media (max-width: 600px) {
    width: 75%;
  }
  .info {
    padding: 15px;
  }
  .title {
    font-weight: 400;
    margin: 0px;
    margin-bottom: 5px;
  }
  .desc {
    color: gray;
    font-size: 14px;
  }
  .btn {
    &.setting {
      margin-left: auto;
    }
    >* {
      padding: 5px 0px;
    }
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    &:hover {
      background-color: hsl(0, 0%, 90%);
    }
  }
}
</style>
