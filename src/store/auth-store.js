import { defineStore } from 'pinia';
import config from '../config';
import { ref } from 'vue';
import http from '../lib/axios';

const authStore = defineStore('auth', () => {
  const user = ref();
  const email = ref();
  const password = ref();
  const isLoading = ref(false);
  const status = ref();

  async function login() {
    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      isLoading.value = true;
      const res = await http.post('/auth/login', payload);
      status.value = res.status;
      const token = res.data.token;
      localStorage.setItem('token', token);
      window.open('/', '_self');
    } catch (e) {
      status.value = e.response.status;
    } finally {
      isLoading.value = false;
    }
  }

  function authGoogle() {
    window.open(config.apiUrl + '/oauth2/authorization/google', '_self');
  }

  function logout() {
    localStorage.clear();
    window.open('/login', '_self');
  }

  async function getAuthenticatedUser() {
    const res = await http.get('/users/authenticated');
    user.value = res.data?.data;
  }

  return {
    getAuthenticatedUser,
    authGoogle,
    login,
    logout,
    user,
    status,
    isLoading,
    email,
    password,
  };
});

export { authStore };
