<script setup>
import TransactionModal from './TransactionModal.vue';
import { walletStore } from '../store/wallet-store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import formatNumber from '../utils/format-number';
const store = walletStore();
const { balance } = storeToRefs(store);

onMounted(() => {
  store.getBalance();
});
</script>
<template>
  <div
    class="w-100 rounded shadow bg-primary px-2 position-relative mb-5"
    style="height: 220px">
    <span class="text-light fs-4">balance</span>
    <div class="position-absolute top-50 start-50 translate-middle">
      <span class="text-light" style="font-size: 1.5rem"
        ><small>IDR</small> {{ formatNumber(balance) }}</span
      >
    </div>
    <div class="w-100 start-0 position-absolute px-3" style="bottom: -2rem">
      <div
        class="bg-light w-100 rounded p-3 shadow d-flex justify-content-center">
        <button
          class="btn btn-sm btn-success w-100 d-flex align-items-center justify-content-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#top-up-modal">
          <i class="bi bi-plus-circle-fill fs-5 me-2"></i> Top up
        </button>
        <div class="mx-2"></div>
        <button
          class="btn btn-sm btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#cash-out-modal">
          <i class="bi bi-dash-circle-fill fs-5 me-2"></i>
          Cash out
        </button>
      </div>
    </div>
  </div>
  <TransactionModal type="Top up" id="top-up-modal" />
  <TransactionModal type="Cash out" id="cash-out-modal" />
</template>
