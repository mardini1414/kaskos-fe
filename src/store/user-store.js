import { defineStore } from 'pinia';
import http from '../lib/axios';
import { ref } from 'vue';

const userStore = defineStore('users', () => {
  const data = ref();
  const name = ref();
  const email = ref();
  const password = ref();
  const errors = ref();
  const isLoading = ref(false);
  const status = ref();

  async function create() {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    try {
      isLoading.value = true;
      const res = await http.post('/users', payload);
      status.value = res.status;
      name.value = '';
      email.value = '';
      password.value = '';
      errors.value = null;
    } catch (e) {
      status.value = e.response.status;
      errors.value = e.response.data.errors;
    } finally {
      isLoading.value = false;
    }
  }

  async function getAll() {
    try {
      isLoading.value = true;
      const res = await http.get('/users');
      status.value = res.status;
      data.value = res.data?.data;
    } catch (e) {
      status.value = e.response.status;
      errors.value = e.response.data.errors;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    name,
    email,
    password,
    isLoading,
    data,
    errors,
    status,
    create,
    getAll,
  };
});

export { userStore };
