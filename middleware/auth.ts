import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    console.log("currentToken ===> ", authStore.accessToken)
    if (!authStore.accessToken && to.path !== '/login') {
      return navigateTo({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if (authStore.accessToken && to.path == '/login') {
      return navigateTo('/home')
    }
  })