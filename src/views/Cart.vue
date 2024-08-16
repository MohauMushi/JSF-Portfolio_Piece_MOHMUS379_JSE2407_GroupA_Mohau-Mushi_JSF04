<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1
      class="text-3xl font-extrabold text-gray-900 dark:text-white mb-5 text-center"
    >
      Shopping Cart
    </h1>
    <div
      v-if="cartItems.length === 0"
      class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <p class="text-lg sm:text-xl dark:text-white">Your cart is empty.</p>
      <router-link
        to="/"
        class="mt-4 inline-block bg-teal-500 dark:bg-[#7a5af5] dark:hover:bg-[#9171f8] text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Continue Shopping
      </router-link>
    </div>
    <div v-else class="space-y-5 m-5">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 bg-slate-50 dark:bg-gray-800 rounded-xl"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full sm:w-28 h-32 mt-3 ml-4 object-contain mb-4 sm:mb-0 sm:mr-4"
        />
        <div class="flex-grow w-full sm:w-auto">
          <h2 class="text-lg font-semibold dark:text-stone-50">
            {{ item.title }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            ${{ item.price.toFixed(2) }} each
          </p>
          <div class="flex flex-wrap items-center mt-2">
            <div class="flex items-center mr-4 mb-2 sm:mb-0">
              <button
                @click="decreaseQuantity(item.id)"
                class="bg-gray-200 dark:bg-gray-700 dark:text-white h px-2 py-1 rounded-l"
              >
                &minus;
              </button>
              <input
                type="number"
                v-model="item.quantity"
                @change="updateQuantity(item.id, $event.target.value)"
                class="w-12 text-center border-t border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                @click="increaseQuantity(item.id)"
                class="bg-gray-200 dark:bg-gray-700 dark:text-white px-2 py-1 rounded-r"
              >
                +
              </button>
            </div>
            <button
              @click="removeItem(item.id)"
              class="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Remove
            </button>
          </div>
        </div>
        <p class="font-semibold mt-2 mr-5 sm:mt-0 sm:ml-4 dark:text-stone-50">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </p>
      </div>
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <button
          @click="clearCart"
          class="w-full sm:w-auto mb-4 sm:mb-0 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700"
        >
          Clear Cart
        </button>
        <div class="text-xl dark:text-stone-50">
          Total: <span class="font-bold">${{ totalCost.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/CartStore.js";

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const totalCost = computed(() => cartStore.totalCost);

const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, parseInt(quantity, 10));
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(id, item.quantity - 1);
  }
};

const increaseQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    cartStore.updateQuantity(id, item.quantity + 1);
  }
};

const removeItem = (id) => {
  cartStore.removeFromCart(id);
};

const clearCart = () => {
  cartStore.clearCart();
};
</script>
