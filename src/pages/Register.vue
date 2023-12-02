<script setup>
import GoogleButtonLogin from '../components/GoogleButtonLogin.vue';
import KaskosIcon from '../components/KaskosIcon.vue';
import { userStore } from '../store/user-store';
import { storeToRefs } from 'pinia';

const store = userStore();
const { isLoading, name, email, password, errors, status } = storeToRefs(store);
</script>
<template>
  <div>
    <KaskosIcon />
    <h1 class="mt-3 mb-5 text-center">Register</h1>
    <div v-if="status === 422" class="alert alert-danger">
      Email already exists
    </div>
    <div v-if="status === 201" class="alert alert-success">
      Register success
    </div>
    <form class="mb-3 d-grid gap-4" @submit.prevent="store.create()">
      <div>
        <input
          :class="`form-control form-control-lg ${
            errors?.name ? 'is-invalid' : ''
          }`"
          placeholder="name"
          type="text"
          v-model="name"
          required />
        <span v-if="errors?.name" class="text-danger"
          >name {{ errors?.name }}</span
        >
      </div>
      <div>
        <input
          :class="`form-control form-control-lg ${
            errors?.email ? 'is-invalid' : ''
          }`"
          placeholder="email"
          type="email"
          v-model="email"
          required />
        <span v-if="errors?.email" class="text-danger"
          >email {{ errors?.email }}</span
        >
      </div>
      <div>
        <input
          :class="`form-control form-control-lg ${
            errors?.password ? 'is-invalid' : ''
          }`"
          placeholder="password"
          type="password"
          v-model="password"
          required />
        <span v-if="errors?.password" class="text-danger"
          >password {{ errors?.password }}</span
        >
      </div>
      <button class="btn btn-lg btn-primary w-100" :disabled="isLoading">
        <div v-if="isLoading" class="spinner-border spinner-border-sm"></div>
        {{ isLoading ? '' : 'Register' }}
      </button>
    </form>
    <div class="text-center mb-5">
      <span class="text-muted d-block py-3">OR</span>
      <GoogleButtonLogin />
    </div>
    <div class="text-center mb-3">
      <span class="text-muted"
        >already have an account
        <router-link to="/login">Login</router-link></span
      >
    </div>
  </div>
</template>
