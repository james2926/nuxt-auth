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
</script>
