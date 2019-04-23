<template>
  <div>
    <app-sidebar></app-sidebar>
    <div class="progress-line" :style="{ width: `${widthProgressLine}%` }" v-if="showProgressLine"></div>
    <div class="content">
      <div :class="['progress-overlay', { 'activated': showProgressLine }]"></div>
      <div class="container" v-show="visible">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from './components/layout/AppSidebar'
export default {
  components: {
    AppSidebar
  },
  data () {
    return {
      widthProgressLine: 0,
      showProgressLine: false,
      visible: false
    }
  },
  created () {
    let intervalIncreaseProgress
    this.$eventHub.$on('start-progress-line', () => {
      this.visible = false
      this.showProgressLine = true
      intervalIncreaseProgress = setInterval(() => {
        this.widthProgressLine += (100 * 100 / 5000)
      }, 100)
    })
    this.$eventHub.$on('end-progress-line', () => {
      clearInterval(intervalIncreaseProgress)
      this.widthProgressLine = 100
      setTimeout(() => {
        this.showProgressLine = false
        this.widthProgressLine = 0
        this.visible = true
      }, 500)
    })
  }
}
</script>
