import axios from 'axios'

export default {
  async request (method, endpoint, data = {}) {
    try {
      const url = `localhost${endpoint}`
      const response = await axios({
        method,
        url,
        data
      })
      return response.data
    } catch (e) {
      return false
    }
  },
  get (endpoint, param = {}) {
    return this.request('get', endpoint, param)
  },
  post (endpoint, param = {}) {
    return this.request('post', endpoint, param)
  },
  put (endpoint, param = {}) {
    return this.request('put', endpoint, param)
  },
  delete (endpoint, param = {}) {
    return this.request('delete', endpoint, param)
  }
}
