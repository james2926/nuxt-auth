<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MyApp</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            </li>
            <input type="text" v-model="authStore.isLoggedIn" hidden />
            <li class="nav-item" v-if="!authStore.isLoggedIn">
              <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
            </li>
            <li class="nav-item" v-if="authStore.isLoggedIn">
              <button @click="logout" class="nav-link btn btn-link">Logout</button>
            </li>
            <li class="nav-item">
              <NuxtLink to="/secured" class="nav-link">Secured</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <NuxtPage />
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

<style>
/* Add any additional custom styling here if needed */
</style>