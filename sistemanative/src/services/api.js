import axios from 'axios'

const api = axios.create({
  baseURL: 'http://104.223.143.72:3000',
})

export default api
