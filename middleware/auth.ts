import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if(process.client) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn && to.path !== '/login') {
        return navigateTo({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  })