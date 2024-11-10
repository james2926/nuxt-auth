<template>
    <div>
        <h1>Secured Page</h1>
        <p>This page is secured and requires authentication.</p>
    </div>
</template>
<script setup>
  definePageMeta({
    middleware: 'auth'
})

// import { useAuthStore } from '~/stores/auth'
// import { ref, onMounted } from 'vue';

// const authStore = useAuthStore()
// onMounted(() => {
//     authStore.initializeFromLocalStorage()
//   });
//     definePageMeta({
//         middleware: [
//             function (to, from) {
//                 if (!authStore.accessToken && to.path !== '/login') {
//                     return navigateTo({
//                     path: '/login',
//                     query: { redirect: to.fullPath }
//                     });
//                 }
//             },
//             'auth',
//         ]
//     });
</script>
