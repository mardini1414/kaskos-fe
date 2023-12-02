<script setup>
import { walletStore } from '../store/wallet-store';
import { storeToRefs } from 'pinia';

const store = walletStore();
const {
  nominal,
  isTopUpSuccess,
  isCashOutSuccess,
  isLoading,
  message,
  errors,
} = storeToRefs(store);

const props = defineProps(['type', 'id']);

function handleClick() {
  if (props.type === 'Top up') {
    store.topUp();
  } else {
    store.cashOut();
  }
}
</script>
<template>
  <div
    class="modal modal-sm fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ type }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div
            v-if="isTopUpSuccess && type === 'Top up'"
            class="alert alert-success">
            Top up success
          </div>
          <div
            v-if="isCashOutSuccess && type === 'Cash out'"
            class="alert alert-success">
            Cash out success
          </div>
          <div v-if="message" class="alert alert-danger">
            {{ message }}
          </div>
          <label class="form-label" for="nominal">Nominal</label>
          <input
            :class="`form-control ${errors?.nominal ? 'is-invalid' : ''}`"
            id="nominal"
            type="number"
            required
            v-model="nominal" />
          <small
            v-if="errors?.nominal"
            class="text-danger"
            style="font-size: 0.6rem"
            >nominal {{ errors?.nominal }}</small
          >
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            :disabled="isLoading"
            type="button"
            class="btn btn-primary"
            @click="handleClick">
            <div
              v-if="isLoading"
              class="spinner-border spinner-border-sm"></div>
            {{ type === 'Top up' ? 'Top up' : 'Cash out' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
