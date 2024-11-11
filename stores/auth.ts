import { defineStore, createPinia } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// Use the plugin
pinia.use(piniaPluginPersistedstate)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
  }),

  actions: {
    // Initialize state from localStorage if available (client-side only)
    initializeFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const storedAccessToken = localStorage.getItem('accessToken')
        const storedRefreshToken = localStorage.getItem('refreshToken')
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn')

        if (storedAccessToken) this.accessToken = storedAccessToken
        if (storedRefreshToken) this.refreshToken = storedRefreshToken
        if (storedIsLoggedIn) this.isLoggedIn = JSON.parse(storedIsLoggedIn)
      }
    },

    async login(username: string, password: string) {
      const config = useRuntimeConfig()

      const response = await axios.post(`${config.public.apiBaseUrl}/public/users/login`, {
        username,
        password,
      })

      this.accessToken = response.data.access_token
      this.refreshToken = response.data.refresh_token
      this.isLoggedIn = true

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
      this.persistToLocalStorage()
    },

    async refresh() {
      const config = useRuntimeConfig()
      try {
        const response = await axios.post(`${config.public.apiBaseUrl}/public/users/refresh`, {
          refresh_token: this.refreshToken,
        })

        console.log('refresh token')
        console.log(response.data.access_token)

        this.accessToken = response.data.access_token
        this.isLoggedIn = true
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
        this.persistToLocalStorage()
        return true
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.logout() // Logout if the refresh token fails
        return false
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.isLoggedIn = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isLoggedIn')
      }
      delete axios.defaults.headers.common['Authorization']
    },

    persistToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', this.accessToken || '')
        localStorage.setItem('refreshToken', this.refreshToken || '')
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn))
      }
    },
  },

  persist: true,
})

// Automatically initialize the store from localStorage when in client-side
onMounted(() => {
  if (typeof window !== 'undefined') {
    const authStore = useAuthStore()
    console.log("authStore ==> ", authStore);
    authStore.initializeFromLocalStorage()

    // Set up Axios interceptor for automatic token refresh
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config
        const authStore = useAuthStore()

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          // Try to refresh the token
          const refreshSuccess = await authStore.refresh()

          if (refreshSuccess) {
            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${authStore.accessToken}`
            return axios(originalRequest)
          } else {
            // Redirect to login if refresh fails
            authStore.logout()
            // Assuming you have a method to redirect to the login page
            // Replace this with your actual redirection logic, e.g.:
            window.location.href = '/login'
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      }
    )
  }
})
