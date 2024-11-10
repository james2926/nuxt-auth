import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && authStore.refreshToken) {
        await authStore.refresh()
        return axios(error.config)
      }
      return Promise.reject(error)
    }
  )
})
