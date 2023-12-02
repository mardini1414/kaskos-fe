<script setup>
import { useRouter } from 'vue-router';
import { userStore } from '../store/user-store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = userStore();
const { data: members } = storeToRefs(store);

onMounted(() => {
  store.getAll();
});

const router = useRouter();
</script>
<template>
  <h4 class="text-dark d-block my-3">Members</h4>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-primary">No</th>
        <th class="text-primary">Name</th>
        <th class="text-primary">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, i) in members">
        <td class="text-muted">{{ i + 1 }}</td>
        <td class="text-muted">{{ user?.name }}</td>
        <td class="text-muted">{{ user?.email }}</td>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-primary" @click="router.push('/')">
    <i class="bi bi-arrow-left-circle-fill"></i> Back
  </button>
</template>
