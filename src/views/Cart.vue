<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Your Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-center py-8">
      <p class="text-xl">Your cart is empty.</p>
      <router-link
        to="/"
        class="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Continue Shopping
      </router-link>
    </div>
    <div v-else>
      <div class="space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center border-b pb-4"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-20 h-20 object-contain mr-4"
          />
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-600">${{ item.price.toFixed(2) }} each</p>

          </div>
          <p class="font-semibold">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </p>
        </div>
      </div>
      <div class="mt-8 flex justify-between items-center">
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
