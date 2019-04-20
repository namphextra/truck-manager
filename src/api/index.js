import http from '@/services/http'

export default {
  getTrucks () {
    return http.get('/trucks')
  }
}
