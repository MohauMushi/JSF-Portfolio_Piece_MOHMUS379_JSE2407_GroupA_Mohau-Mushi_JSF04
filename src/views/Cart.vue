<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6">Your Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-center py-8">
      <p class="text-lg sm:text-xl">Your cart is empty.</p>
      <router-link
        to="/"
        class="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Continue Shopping
      </router-link>
    </div>
    <div v-else class="space-y-5">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 bg-slate-50 rounded-xl"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full sm:w-28 h-32 mt-3 object-contain mb-4 sm:mb-0 sm:mr-4"
        />
        <div class="flex-grow w-full sm:w-auto">
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-gray-600">${{ item.price.toFixed(2) }} each</p>
          <div class="flex flex-wrap items-center mt-2">
            <div class="flex items-center mr-4 mb-2 sm:mb-0">
              <button
                class="bg-gray-200 h px-2 py-1 rounded-l"
              >
                &minus;
              </button>
              <input
                type="number"
                v-model="item.quantity"
                @change="updateQuantity(item.id, $event.target.value)"
                class="w-12 text-center border-t border-b border-gray-200"
              />
              <button
                class="bg-gray-200 px-2 py-1 rounded-r"
              >
                +
              </button>
            </div>
            <button
              class="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
        <p class="font-semibold mt-2 mr-5 sm:mt-0 sm:ml-4">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </p>
      </div>
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center">
        
        <div class="text-xl">
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
</script>
