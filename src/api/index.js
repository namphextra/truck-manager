import http from '@/services/http'

export default {
  getTrucks ({ option, filter, page }) {
    let query = `?_page=${page}&_limit=5`
    if (option && option !== 'all') {
      query = `&${option}_like=${filter}`
    }
    return http.get(`/trucks${query}`)
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
