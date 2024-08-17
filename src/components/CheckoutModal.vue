<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4 dark:text-white">Checkout</h2>

      <!-- User Information -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 dark:text-white">
          Your Information
        </h3>
        <input
          v-model="checkoutStore.userInfo.name"
          placeholder="Name"
          class="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          v-model="checkoutStore.userInfo.address"
          placeholder="Address"
          class="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          v-model="checkoutStore.userInfo.email"
          placeholder="Email"
          class="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <!-- Payment Method -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 dark:text-white">
          Payment Method
        </h3>
        <select
          v-model="checkoutStore.paymentMethod"
          class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select payment method</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCheckoutStore } from "../store/CheckoutStore.js";

const props = defineProps({
  isOpen: Boolean,
});

const checkoutStore = useCheckoutStore();
</script>
