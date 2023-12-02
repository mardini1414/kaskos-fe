import { defineStore } from 'pinia';
import http from '../lib/axios';
import { ref } from 'vue';

const walletStore = defineStore('wallet', () => {
  const data = ref();
  const balance = ref(0);
  const nominal = ref();
  const message = ref();
  const errors = ref();
  const isTopUpSuccess = ref(false);
  const isCashOutSuccess = ref(false);
  const isLoading = ref(false);
  const status = ref();
  const page = ref(1);
  const isLastPage = ref(false);
  const email = ref('');
  const created = ref('');

  async function getBalance() {
    try {
      isLoading.value = true;
      const res = await http.get('/wallet');
      status.value = res.status;
      nominal.value = null;
      errors.value = null;
      balance.value = res.data?.data.balance;
    } catch (e) {
      status.value = e.response?.status;
      errors.value = e.response?.data.errors;
    } finally {
      isLoading.value = false;
    }
  }

  async function topUp() {
    const payload = {
      nominal: nominal.value,
    };

    try {
      isLoading.value = true;
      const res = await http.post('/wallet/top-up', payload);
      status.value = res.status;
      nominal.value = null;
      errors.value = null;
      isTopUpSuccess.value = true;
      isCashOutSuccess.value = false;
      getHistories();
      getBalance();
    } catch (e) {
      status.value = e.response?.status;
      errors.value = e.response?.data.errors;
      isTopUpSuccess.value = false;
    } finally {
      isLoading.value = false;
    }
  }

  async function cashOut() {
    const payload = {
      nominal: nominal.value,
    };

    try {
      isLoading.value = true;
      const res = await http.post('/wallet/cash-out', payload);
      status.value = res.status;
      nominal.value = null;
      errors.value = null;
      isTopUpSuccess.value = false;
      isCashOutSuccess.value = true;
      message.value = '';
      getHistories();
      getBalance();
    } catch (e) {
      status.value = e.response.status;
      errors.value = e.response?.data.errors;
      message.value = e.response?.data?.message;
      isCashOutSuccess.value = false;
    } finally {
      isLoading.value = false;
    }
  }

  async function getHistories() {
    try {
      isLoading.value = true;
      const res = await http.get(
        `/wallet/histories?page=${page.value}${
          !!email.value ? '&email=' + email.value : ''
        }${!!created.value ? '&created_at=' + created.value : ''}`
      );
      status.value = res.status;
      data.value = res.data?.data?.content;
      isLastPage.value = res.data?.data?.last;
    } catch (e) {
      status.value = e.response.status;
      errors.value = e.response.data.errors;
      isLastPage.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  async function getWithScroll() {
    try {
      isLoading.value = true;
      const res = await http.get(`/wallet/histories?page=${page.value}`);
      data.value = [...data.value, ...res.data?.data?.content];
      isLastPage.value = res.data?.data?.last;
    } catch (e) {
      status.value = e.response?.status;
      errors.value = e.response.data.errors;
      isLastPage.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    nominal,
    data,
    balance,
    errors,
    message,
    status,
    isTopUpSuccess,
    isCashOutSuccess,
    page,
    isLastPage,
    email,
    created,
    getBalance,
    topUp,
    cashOut,
    getHistories,
    getWithScroll,
  };
});

export { walletStore };
