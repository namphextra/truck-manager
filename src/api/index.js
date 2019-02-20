import http from '@/services/http'

export default {
  login ({ username, password, isDemo }) {
    if (isDemo) {
      return username === 'demo' && password === 'demo'
    }
    const param = {
      username,
      password
    }
    return http.post('/login', param)
  },
  getPosts () {
    return http.get('/posts')
  },
  updatePosts (param) {
    return http.put('/posts', param)
  },
  createPosts (param) {
    return http.post('/posts', param)
  },
  deletePosts (param) {
    return http.delete(`/posts/${param.id}`)
  }
}
