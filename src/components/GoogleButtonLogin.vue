<script setup>
import { icons } from '../constant';
import { authStore } from '../store/auth-store';

const store = authStore();
</script>
<template>
  <div
    class="w-100 d-flex align-items-center justify-content-center border py-2 rounded"
    style="cursor: pointer"
    @click="store.authGoogle()">
    <img :src="icons.google" alt="google icon" width="32" class="me-2" />
    Continue with google
  </div>
</template>
