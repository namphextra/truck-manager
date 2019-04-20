<template>
  <div class="sidebar">
    <div class="sidebar__name d-flex align-items-center">
      <img src="/public/assets/images/logo.svg" alt="">
      <span class="font-weight-bold">Truck Manager</span>
    </div>
    <ul class="tree-menu">
      <li
        v-for="(menu, index) in menus" :key="index"
      >
        <router-link :to="{name: menu.name}" :class="{ 'router-link-active': isActivatedMenu(menu) }">{{ menu.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Menus from '@/constants/SidebarMenu'
export default {
  data () {
    return {
      menus: Menus
    }
  },
  methods: {
    isActivatedMenu (menu) {
      return menu.subMenuActiveName.includes(this.$route.name) || menu.name === this.$route.name
    }
  }
}
</script>
