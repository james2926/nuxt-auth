<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 100%; max-width: 400px;">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const router = useRouter();
const route = useRoute();

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value);

    const redirectPath = route.query.redirect || '/';
    router.push(redirectPath);
  } catch (error) {
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
/* Center the card in the viewport */
.vh-100 {
  height: 100vh;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

.card {
  width: 100%;
  max-width: 400px;
}
</style>
