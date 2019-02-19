<template>
  <div class="admin">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>User name:</label>
        <input type="text" v-model="username" placeholder="Your user name" required>
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" placeholder="Your password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import API from '@/api'
export default {
  name: 'admin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm () {
      const success = API.login({ password: this.password, username: this.username, isDemo: true })
      console.log(3333, success)
      if (success) {
        this.$router.push({ name: 'posts' })
      }
    }
  }
}
</script>
