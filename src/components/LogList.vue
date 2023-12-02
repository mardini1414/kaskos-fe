<script setup>
import FilterModal from './FilterModal.vue';
import { walletStore } from '../store/wallet-store';
import { storeToRefs } from 'pinia';
import formatDate from '../utils/format-date';
import { onMounted, ref } from 'vue';

const scrollObserverRef = ref(null);
const store = walletStore();
const { data, isLoading, page, isLastPage } = storeToRefs(store);

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting && !isLoading.value && !isLastPage.value) {
      page.value++;
      store.getWithScroll();
    }
  },
  { threshold: 1.0 }
);

onMounted(() => {
  page.value = 1;
  store.getHistories();
  observer.observe(scrollObserverRef.value);
});
</script>
<template>
  <div class="pt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="text-dark d-block">History log</h4>
      <div>
        <button
          class="btn btn-sm btn-primary d-flex align-items-center gap-1"
          data-bs-toggle="modal"
          data-bs-target="#filter-modal">
          <i class="bi bi-filter fs-5"></i> Filter
        </button>
      </div>
    </div>
    <div
      v-if="data?.length < 1"
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 10rem">
      <i class="bi bi-box2 text-muted" style="font-size: 3rem"></i>
      <span class="text-muted">No data</span>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="history in data">
        <div>
          <span class="d-block">{{ history.name }}</span>
          <small class="d-block text-muted" style="font-size: 0.8rem">{{
            history.email
          }}</small>
        </div>
        <div>
          <span
            :class="`d-block text-end ${
              history.type === 'TOP_UP' ? 'text-success' : 'text-danger'
            }`">
            {{ history.type === 'TOP_UP' ? '+' : '-' }} {{ history.nominal }}
          </span>
          <small
            class="d-block text-end text-muted"
            style="font-size: 0.8rem"
            >{{ formatDate(history.createdAt) }}</small
          >
        </div>
      </li>
    </ul>
  </div>
  <div
    v-if="isLoading"
    class="spinner-border text-primary d-block mx-auto my-5"
    role="status"></div>
  <div ref="scrollObserverRef"></div>
  <FilterModal />
</template>
