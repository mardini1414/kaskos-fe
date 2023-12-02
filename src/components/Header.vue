<script setup>
import { storeToRefs } from 'pinia';
import { authStore } from '../store/auth-store';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const store = authStore();
const { user } = storeToRefs(store);

onMounted(() => {
  store.getAuthenticatedUser();
});
</script>
<template>
  <div>
    <div class="py-3 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-person-circle text-primary" style="font-size: 2rem"></i>
        <div class="ms-2">
          <span class="d-block text-primary" style="font-size: 0.8rem">{{
            user?.name
          }}</span>
          <small class="d-block text-muted" style="font-size: 0.6rem">{{
            user?.email
          }}</small>
        </div>
      </div>
      <div class="dropdown">
        <i
          class="bi bi-list text-dark"
          data-bs-toggle="dropdown"
          style="font-size: 2rem; cursor: pointer"></i>
        <ul class="dropdown-menu dropdown-menu-end px-2">
          <li
            class="text-dark d-flex align-items-center gap-2"
            style="cursor: pointer"
            @click="router.push('/members')">
            <i class="bi bi-people-fill" style="font-size: 1.5rem"></i>
            <span class="ms-2">Members</span>
          </li>
          <li
            class="text-danger d-flex align-items-center gap-2"
            style="cursor: pointer"
            @click="store.logout()">
            <i class="bi bi-power" style="font-size: 1.5rem"></i>
            <span class="ms-2">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
