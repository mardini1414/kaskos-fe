<script setup>
import { walletStore } from '../store/wallet-store';
import { userStore } from '../store/user-store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const wallet = walletStore();
const user = userStore();
const { email, created, page } = storeToRefs(wallet);
const { data } = storeToRefs(user);

onMounted(() => {
  user.getAll();
  clear();
});

function save() {
  page.value = 1;
  wallet.getHistories();
}

function clear() {
  email.value = '';
  created.value = '';
}
</script>

<template>
  <div
    class="modal modal-sm fade"
    id="filter-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Filter</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <select class="form-control form-control-sm mb-3" v-model="email">
            <option value="" disabled selected>Select user</option>
            <option :value="item.email" v-for="item in data">
              {{ item.name }}
            </option>
          </select>
          <input
            class="form-control form-control-sm"
            type="date"
            v-model="created" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="clear">
            Clear
          </button>
          <button type="button" class="btn btn-primary" @click="save">
            Filter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
