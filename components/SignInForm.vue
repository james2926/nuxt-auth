<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <form @submit.prevent="handleSignIn" class="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 class="text-2xl font-bold text-center">Sign In</h2>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            v-model="username"
            required
            class="w-full mt-1 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full mt-1 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" class="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign In
        </button>
        <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
//   import { ref } from 'vue';
// import { useAuth } from '~/composables/useAuth';

//   const username = ref('');
//   const password = ref('');
//   const { signIn, error } = useAuth();
  
//   const handleSignIn = async () => {
//     await signIn(username.value, password.value);
//   };
  </script>
  