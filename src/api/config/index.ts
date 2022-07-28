import axios from "axios"

export const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  baseURL: "194.62.19.27:8000/api/",
  withCredentials: true,
})
