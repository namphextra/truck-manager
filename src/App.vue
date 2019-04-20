<template>
  <div>
    <app-sidebar></app-sidebar>
    <div class="content">
      <div class="container">
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
  }
}
</script>
