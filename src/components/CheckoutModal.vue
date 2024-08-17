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

      <!-- Order Summary -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 dark:text-white">
          Order Summary
        </h3>
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between mb-2"
        >
          <span class="dark:text-white"
            >{{ item.title }} (x{{ item.quantity }})</span
          >
          <span class="dark:text-white"
            >${{ (item.price * item.quantity).toFixed(2) }}</span
          >
        </div>
        <div class="font-bold mt-2 dark:text-white">
          Total: ${{ totalCost.toFixed(2) }}
        </div>
      </div>

      <button
        @click="placeOrder"
        class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2"
      >
        Place Order
      </button>

      <button
        @click="close"
        class="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>

      <p v-if="checkoutStore.checkoutError" class="text-red-500 mt-2">
        {{ checkoutStore.checkoutError }}
      </p>
      <p v-if="checkoutStore.orderConfirmation" class="text-green-500 mt-2">
        {{ checkoutStore.orderConfirmation }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/CartStore.js";
import { useCheckoutStore } from "../store/CheckoutStore.js";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const cartItems = computed(() => cartStore.items);
const totalCost = computed(() => cartStore.totalCost);

const placeOrder = async () => {
  await checkoutStore.placeOrder();
  if (checkoutStore.orderConfirmation) {
    setTimeout(() => {
      close();
    }, 3000);
  }
};

const close = () => {
  checkoutStore.clearCheckoutState();
  emit("close");
};
</script>
