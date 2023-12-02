<script setup>
import GoogleButtonLogin from '../components/GoogleButtonLogin.vue';
import KaskosIcon from '../components/KaskosIcon.vue';
import { authStore } from '../store/auth-store';
import { storeToRefs } from 'pinia';

const store = authStore();
const { status, isLoading, email, password } = storeToRefs(store);
</script>
<template>
  <div>
    <KaskosIcon />
    <h1 class="mt-3 mb-5 text-center">Login</h1>
    <div v-if="status === 401" class="alert alert-danger">
      Email or password is wrong
    </div>
    <form class="mb-3 d-grid gap-4" @submit.prevent="store.login()">
      <input
        class="form-control form-control-lg"
        placeholder="email"
        type="email"
        v-model="email"
        required />
      <input
        class="form-control form-control-lg"
        placeholder="password"
        type="password"
        v-model="password"
        required />
      <button class="btn btn-lg btn-primary w-100" :disabled="isLoading">
        <div v-if="isLoading" class="spinner-border spinner-border-sm"></div>
        {{ isLoading ? '' : 'Login' }}
      </button>
    </form>
    <div class="text-center mb-5">
      <span class="text-muted d-block py-3">OR</span>
      <GoogleButtonLogin />
    </div>
    <div class="text-center mb-3">
      <span class="text-muted"
        >don't have an account
        <router-link to="/register">Register</router-link></span
      >
    </div>
  </div>
</template>
