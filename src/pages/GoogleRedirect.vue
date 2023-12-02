<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const token = route.query?.token;
localStorage.setItem('token', token);
window.open('/', '_self');
</script>
<template>
  <span>redirecting...</span>
</template>
