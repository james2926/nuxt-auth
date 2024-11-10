<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="text-center">
        <h1>Welcome to MyApp</h1>
        <p class="lead">This is the homepage of your Nuxt 3 application with a Bootstrap Navbar and Login page.</p>
        <NuxtLink v-if="!authStore.isLoggedIn" to="/login" class="btn btn-primary">Go to Login</NuxtLink>
        <NuxtLink v-if="authStore.isLoggedIn" @click="logout" class="btn btn-danger">Logout</NuxtLink>
        <!-- <ul>
            <NuxtLink to="/secured/one">Secured One</NuxtLink>
            <NuxtLink to="/secured/two">Secured Two</NuxtLink>
        </ul> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '~/stores/auth'
  import { ref, onMounted } from 'vue';
  
  const authStore = useAuthStore()

  onMounted(() => {
    authStore.initializeFromLocalStorage()
  });
  
  const logout = () => {
    authStore.logout(); 
  }
  </script>
  
  <style scoped>
  .vh-100 {
    height: 100vh;
  }
  </style>
  