<template>
  <div>
    <div>Posts page</div>
    <div class="alert alert-danger" role="alert" v-if="isDanglerAlert">
      {{ messageDangerAlert }}
    </div>
    <div class="alert alert-success" role="alert" v-if="isSuccessAlert">
      {{ messageSuccessAlert }}
    </div>
    <button class="btn btn-info m-1" @click="getPosts">Get post</button>
    <button class="btn btn-primary m-1" @click="createPosts">Create post</button>
    <button class="btn btn-warning m-1" @click="updatePosts">Update post</button>
    <button class="btn btn-danger m-1" @click="deletePosts">Delete post</button>
    <button class="btn btn-light" @click.prevent="logout">Logout</button>
  </div>
</template>

<script>
import API from '@/api'
export default {
  data () {
    return {
      isDanglerAlert: false,
      isSuccessAlert: false,
      messageDangerAlert: '',
      messageSuccessAlert: ''
    }
  },
  methods: {
    async getPosts () {
      const res = await API.getPosts()
      this.alertHandle(res, 'get')
    },
    async createPosts () {
      const res = await API.createPosts()
      this.alertHandle(res, 'create')
    },
    async updatePosts () {
      const res = await API.updatePosts()
      this.alertHandle(res, 'update')
    },
    async deletePosts () {
      const res = await API.deletePosts()
      this.alertHandle(res, 'delete')
    },
    logout () {
      localStorage.removeItem('isLogged')
      this.$router.push({ path: '/' })
    },
    alertHandle (res, method) {
      if (res) {
        this.isSuccessAlert = true
        this.messageSuccessAlert = `You ${method} post successfully`
      } else {
        this.isDanglerAlert = true
        this.messageDangerAlert = `You ${method} post failed`
      }
      setTimeout(() => {
        this.isSuccessAlert = false
        this.isDanglerAlert = false
      }, 3000)
    }
  }
}
</script>
