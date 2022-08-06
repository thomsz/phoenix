import request, { AxiosInstance } from 'axios'

const generateRequestInstance = (): AxiosInstance => request.create({
  baseURL: import.meta.env.VITE_API_URL
})

export default generateRequestInstance()
