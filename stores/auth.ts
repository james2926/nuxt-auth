// stores/auth.ts
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

        console.log("storedAccessToken =>", storedAccessToken )
        console.log("storedRefreshToken => ", storedRefreshToken)
        console.log("storedIsLoggedIn => ", storedIsLoggedIn)

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
      const response = await axios.post(`${config.public.apiBaseUrl}/public/users/refresh`, {
        refresh_token: this.refreshToken,
      })
      this.accessToken = response.data.access_token
      this.isLoggedIn = true

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
      this.persistToLocalStorage()
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
  }
})
