<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0"
    @click.self="close"
  >
    <div
      class="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] overflow-y-auto relative"
    >
      <button
        @click="close"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 class="text-xl sm:text-2xl font-bold mb-4 dark:text-white">
        Checkout
      </h2>

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
        <p v-if="checkoutStore.checkoutError" class="text-red-500 mt-2 text-sm">
          {{ checkoutStore.checkoutError }}
        </p>
      </div>
      <!-- Payment Method -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 dark:text-white">
          Payment Method
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div
            v-for="method in ['paypal', 'visa', 'mastercard', 'amex']"
            :key="method"
            @click="checkoutStore.paymentMethod = method"
            :class="{
              'border-2 border-teal-500':
                checkoutStore.paymentMethod === method,
            }"
            class="cursor-pointer flex flex-col items-center p-2 rounded transition duration-200"
          >
            <img
              :src="paymentIcons[method]"
              :alt="method"
              class="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
        </div>
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
          <span class="dark:text-white text-sm sm:text-base">
            {{ item.title }} (x{{ item.quantity }})
          </span>
          <span class="dark:text-white text-sm sm:text-base">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </span>
        </div>
        <div class="font-bold mt-2 dark:text-white">
          Total: ${{ totalCost.toFixed(2) }}
        </div>
      </div>

      <button
        @click="placeOrder"
        class="w-full bg-teal-500 dark:bg-[#29223a] hover:bg-teal-600 dark:hover:bg-[#2f2b3a] text-white px-4 py-2 rounded mb-2"
      >
        Place Order
      </button>

      <button
        @click="close"
        class="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
      <p
        v-if="checkoutStore.orderConfirmation"
        class="text-green-500 mt-2 text-sm"
      >
        {{ checkoutStore.orderConfirmation }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/CartStore.js";
import { useCheckoutStore } from "../store/CheckoutStore.js";

import paypalIcon from "../../public/PaymentSVG/paypal.svg";
import visaIcon from "../../public/PaymentSVG/visa.svg";
import mastercardIcon from "../../public/PaymentSVG/mastercard.svg";
import amexIcon from "../../public/PaymentSVG/amex.svg";

const paymentIcons = {
  paypal: paypalIcon,
  visa: visaIcon,
  mastercard: mastercardIcon,
  amex: amexIcon,
};

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
