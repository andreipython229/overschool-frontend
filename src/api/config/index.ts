import axios from 'axios'

export const instance = axios.create({
  baseURL: '194.62.19.27:8000/api/',
  withCredentials: true,
})
