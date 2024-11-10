<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <h1>Secured Page</h1>
        <p>This page is secured and requires authentication.</p>
    </div>
</template>
<script setup>
  definePageMeta({
    middleware: 'auth'
})
</script>
