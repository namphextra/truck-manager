import http from '@/services/http'

export default {
  getTrucks () {
    return http.get('/trucks')
  },
  getTruckByPlate (plate) {
    return http.get(`/trucks?plate=${plate}`)
  },
  createTruck (truck) {
    const params = { ...truck }
    return http.post('/trucks', params)
  },
  updateTruck (truck) {
    const params = { ...truck }
    return http.put(`/trucks/${truck.id}`, params)
  },
  deleteTrucks (id) {
    return http.delete(`/trucks/${id}`)
  }
}
