<template>
  <div class="video-list">
    <WindowListItem v-for="window in windows" :key="window.id" :window="window" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import WindowListItem from '@/components/WindowListItem.vue'
import { Window } from '@/types/window'

@Component({
  components: {
    WindowListItem
  }
})
export default class WindowList extends Vue {
  @Prop() private windows!: Window[];
}
</script>

<style>
.video-list {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
