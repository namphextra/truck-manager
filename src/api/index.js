import http from '@/services/http'

export default {
  login ({ username, password, isDemo }) {
    if (isDemo) {
      return username === 'demo' && password === 'demo'
    }
    return http.post('/login')
  }
}
